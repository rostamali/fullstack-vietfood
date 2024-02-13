'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import Jimp from 'jimp';
import { fileSizeFormat, handleResponse } from '../helpers/formater';
import prisma from '../prisma';
import { isAuthenticated } from './auth.action';
import { join } from 'path';
import { readFile, unlink, writeFile } from 'fs/promises';
import { CompressFormSchema } from '../helpers/form-validation';

export const uploadFilesByAdmin = async (formData: FormData) => {
	try {
		const files: File[] | null = formData.getAll(
			'files',
		) as unknown as File[];
		if (!files || files.length === 0) {
			return handleResponse(false, 'No files uploaded');
		}

		const isAuth = await isAuthenticated();
		if (!isAuth || isAuth.role !== 'ADMIN')
			return handleResponse(false, `You don't have a permission`);

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const buffer = Buffer.from(await file.arrayBuffer());
			const fileName = `upload-${Date.now()}-${
				Math.random() * (999 - 1) + 1
			}.${file.type.split('/')[1]}`;

			const uploadPath = join('./public/uploads', 'files/', fileName);
			await writeFile(uploadPath, buffer);
			const filesize = fileSizeFormat(file.size);

			await prisma.file.create({
				data: {
					fileType: file.type.split('/')[0],
					fileName: fileName,
					title: file.name,
					url: fileName,
					size: filesize,
					author: {
						connect: {
							id: isAuth.id,
						},
					},
				},
			});
		}
		revalidatePath('/admin/files', 'page');

		return handleResponse(true, 'File uploaded successfully');
	} catch (error) {
		return handleResponse(false, 'File uploaded failed');
	}
};
export const fetchFilesByAdmin = async (params: {
	pageSize: number;
	page: number;
	type: string | null;
	query: string | null;
}) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth || isAuth.role !== 'ADMIN') return;

		const { page = 1, pageSize = 10, type, query } = params;
		const files = await prisma.file.findMany({
			where: {
				...(query && {
					OR: [
						{ title: { contains: query } },
						{ description: { contains: query } },
					],
				}),
				...(type && type !== 'all' && { fileType: { contains: type } }),
			},
			select: {
				id: true,
				fileName: true,
				title: true,
				url: true,
				fileType: true,
				description: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: pageSize,
		});
		const countFiles = await prisma.file.count({
			where: {
				...(query && {
					OR: [
						{ title: { contains: query } },
						{ description: { contains: query } },
					],
				}),
				...(type && type !== 'all' && { fileType: { contains: type } }),
			},
		});

		return {
			files,
			pages: Math.ceil(countFiles / pageSize),
		};
	} catch (error) {
		return;
	}
};
export const fetchFileDetailsbyAdmin = async (params: { id: string }) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth || isAuth.role !== 'ADMIN') return null;

		const file = await prisma.file.findUnique({
			where: {
				id: params.id,
			},
			select: {
				id: true,
				title: true,
				fileType: true,
				description: true,
				url: true,
				fileName: true,
				createdAt: true,
				size: true,
				isCompress: true,
				compressPercent: true,
				author: {
					select: {
						firstName: true,
						lastName: true,
						role: true,
					},
				},
			},
		});
		return file;
	} catch (error) {
		return null;
	}
};
export const fetchModalFiles = async ({ pageParam = 0 }) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth || isAuth.role !== 'ADMIN') return [];
		const files = await prisma.file.findMany({
			select: {
				id: true,
				title: true,
				url: true,
				fileType: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
			skip: Number(pageParam) - 1,
			take: 8,
		});
		return files;
	} catch (error) {
		return [];
	}
};
export const compressFileByAdmin = async (params: {
	file: z.infer<typeof CompressFormSchema>;
	id: string;
}) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth || isAuth.role !== 'ADMIN')
			return handleResponse(false, `You don't have permission`);

		const {
			file: { width, height, quality },
			id,
		} = params;

		const fileExist = await prisma.file.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				fileType: true,
				fileName: true,
			},
		});
		if (!fileExist) return handleResponse(false, 'File does not exist');
		if (fileExist.fileType !== 'image')
			return handleResponse(false, `Choose only "image" type`);

		const filePath = join('./public/uploads', 'files/', fileExist.fileName);
		const fileBuffer = await readFile(filePath);
		const selectedFile = await Jimp.read(fileBuffer);

		const newFileName = `upload-${Date.now()}-${
			Math.random() * (999 - 1) + 1
		}.jpg`;
		const uploadPath = join('./public/uploads', 'files/', newFileName);
		selectedFile
			.cover(width, height)
			.quality(quality ? quality : 100)
			.writeAsync(uploadPath);

		await unlink(filePath);

		const newUploadBuffer = await readFile(uploadPath);
		const compressSize = fileSizeFormat(newUploadBuffer.length);

		await prisma.file.update({
			where: {
				id,
			},
			data: {
				fileName: newFileName,
				url: newFileName,
				size: compressSize,
				isCompress: true,
			},
		});
		revalidatePath('/admin/files', 'page');

		return handleResponse(true, 'File compressed successfully');
	} catch (error) {
		return handleResponse(false, 'File compressed failed');
	}
};
export const deleteFilesByAdmin = async (params: { fileId: string[] }) => {
	try {
		const { fileId } = params;
		const isAuth = await isAuthenticated();
		if (!isAuth || isAuth.role !== 'ADMIN')
			return handleResponse(false, `You don't have a permission`);

		const filesToDelete = await prisma.file.findMany({
			where: {
				id: { in: fileId },
			},
			select: {
				id: true,
				fileName: true,
			},
		});
		if (!filesToDelete.length)
			return handleResponse(false, `File does not exist`);

		for (const file of filesToDelete) {
			const filePath = join('./public/uploads', 'files/', file.fileName);
			try {
				await unlink(filePath);
				await prisma.file.delete({
					where: {
						id: file.id,
					},
				});
			} catch (error) {
				return handleResponse(
					false,
					`Error deleting file: ${filePath}`,
				);
			}
		}

		revalidatePath('/admin/files', 'page');
		return handleResponse(true, 'File deleted successfully');
	} catch (error) {
		return handleResponse(false, 'File delete action failed');
	}
};

// Avatar Actions
export const uploadProfilePicture = async (formData: FormData) => {
	try {
		const file: File | null = formData.get('files') as unknown as File;

		if (!file) {
			return handleResponse(false, 'No files uploaded');
		}

		const isAuth = await isAuthenticated();
		if (!isAuth)
			return handleResponse(false, `You don't have a permission`);

		const avatarCheck = await prisma.avatar.findUnique({
			where: {
				userId: isAuth.id,
			},
			select: {
				id: true,
				fileName: true,
			},
		});
		if (avatarCheck) {
			const filePath = join(
				'./public/uploads',
				'avatar/',
				avatarCheck.fileName,
			);
			await unlink(filePath);
			await prisma.avatar.delete({
				where: {
					id: avatarCheck.id,
				},
			});
		}
		const fileName = `upload-${Date.now()}-${
			Math.random() * (999 - 1) + 1
		}.jpg`;

		const uploadPath = join('./public/uploads', 'avatar/', fileName);
		const uploadedAvatar = await file.arrayBuffer();
		const compressAvatar = await Jimp.read(Buffer.from(uploadedAvatar));

		compressAvatar.cover(200, 200).quality(60).writeAsync(uploadPath);
		const compressSize = fileSizeFormat(compressAvatar.bitmap.data.length);
		await prisma.avatar.create({
			data: {
				fileName: fileName,
				url: fileName,
				size: compressSize,
				user: {
					connect: {
						id: isAuth.id,
					},
				},
			},
		});
		revalidatePath('/admin/files', 'page');

		return handleResponse(true, 'Profile picture uploaded');
	} catch (error) {
		return handleResponse(false, 'Profile picture upload failed');
	}
};
export const deleteProfilePicture = async (params: { refreshLink: string }) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth)
			return handleResponse(false, `You don't have a permission`);

		const avatarCheck = await prisma.avatar.findUnique({
			where: {
				userId: isAuth.id,
			},
			select: {
				id: true,
				fileName: true,
			},
		});
		if (!avatarCheck)
			return handleResponse(false, `Profile picture not found`);

		const filePath = join(
			'./public/uploads',
			'avatar/',
			avatarCheck.fileName,
		);
		await unlink(filePath);
		await prisma.avatar.delete({
			where: {
				id: avatarCheck.id,
			},
		});
		revalidatePath(params.refreshLink, 'page');

		return handleResponse(true, 'Profile picture deleted');
	} catch (error) {
		return handleResponse(false, 'Profile picture deletion failed');
	}
};
