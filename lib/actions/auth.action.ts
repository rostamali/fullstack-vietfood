'use server';
import { cookies } from 'next/headers';
import { handleResponse } from '../helpers/formater';
import prisma from '../prisma';
import {
	bcryptPassword,
	compareCode,
	comparePassword,
} from '../helpers/bcrypt-code';
import {
	createEmailVerifyToken,
	isAuthenticated,
	sendAuthToken,
	verifyEmailConfirmToken,
} from '../helpers/jwt-token';
import sendMail from '../helpers/send-mail';
import { verifyEmailTokenOptions } from '../helpers/cookie-options';
import { revalidatePath } from 'next/cache';

export const registerUser = async (params: RegisterUser) => {
	try {
		const { firstName, lastName, email, password } = params as RegisterUser;
		const userExist = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		if (userExist) return handleResponse(false, 'Account already exists');
		const bcryptPass = await bcryptPassword(password);
		const user: RegisterUser = {
			firstName,
			lastName,
			email,
			password: bcryptPass,
		};
		const { token, code } = await createEmailVerifyToken(user);

		await sendMail({
			email,
			subject: 'Account activation email',
			template: `<h1>Verify Code: ${code}</h1>`,
		});

		cookies().set(
			'vietfood_active_account',
			token,
			verifyEmailTokenOptions,
		);

		return {
			success: true,
			message: 'Account registered successfully',
		};
	} catch (error) {
		return handleResponse(false, 'Account registration failed');
	}
};
export const verifyUserEmail = async (params: { code: string }) => {
	try {
		const { code } = params as {
			code: string;
		};
		const token = cookies().get('vietfood_active_account')?.value;

		if (!token) return handleResponse(false, `You don't have permission`);

		const verifiedToken = await verifyEmailConfirmToken(token);
		if (!verifiedToken)
			return handleResponse(false, 'Account activation token expired');

		const checkCode = await compareCode(code, verifiedToken.code);
		if (!checkCode)
			return handleResponse(false, 'Email confirm OTP not match');

		const { firstName, lastName, email, password } = verifiedToken;
		const userExist = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		if (userExist) return handleResponse(false, 'Account already verified');

		await prisma.user.create({
			data: {
				firstName,
				lastName,
				email,
				password,
				isVerified: true,
				status: 'ACTIVE',
			},
		});

		cookies().set('vietfood_active_account', '', { maxAge: 0 });

		return handleResponse(true, 'Email verified successfully');
	} catch (error) {
		return handleResponse(false, 'Email verification failed');
	}
};
export const loginUser = async (params: LoginUser) => {
	try {
		const { email, password, remember = false } = params as LoginUser;
		const userExist = await prisma.user.findUnique({
			where: {
				email,
				status: 'ACTIVE',
				isVerified: true,
			},
			select: {
				id: true,
				email: true,
				password: true,
				role: true,
			},
		});
		if (!userExist)
			return handleResponse(false, 'Email or password is incorrect');
		const isPasswordMatch = await comparePassword(
			password,
			userExist.password,
		);
		if (!isPasswordMatch)
			return handleResponse(false, 'Email or password is incorrect');

		await prisma.user.update({
			where: { id: userExist.id },
			data: {
				lastLogin: new Date(),
			},
		});
		return sendAuthToken(
			userExist,
			remember,
			'User logged in successfully',
		);
	} catch (error) {
		return handleResponse(false, 'Account login failed');
	}
};
export const importUsersFromCSV = async (params: CSVUser[]) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin)
			return {
				success: false,
				message: `You don't have permission`,
			};
		for (const user of params) {
			const bcryptPass = await bcryptPassword(user.password);
			await prisma.user.create({
				data: {
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					password: bcryptPass,
					status: 'ACTIVE',
					isVerified: true,
				},
			});
		}

		revalidatePath('/admin/user', 'page');
		return handleResponse(true, 'User uploaded successfully');
	} catch (error) {
		return handleResponse(false, 'User CSV upload failed');
	}
};
export const fetchUsersByAdmin = async (params: {
	pageSize: number;
	page: number;
	status: UserStatus | null;
	query: string | null;
}) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin) return;

		const { page = 1, pageSize = 10, status, query } = params;
		const users = await prisma.user.findMany({
			where: {
				...(query && {
					OR: [
						{ firstName: { contains: query } },
						{ lastName: { contains: query } },
						{ email: { contains: query } },
					],
				}),
				...(status && {
					status: { equals: status },
				}),
			},
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				status: true,
				createdAt: true,
				lastLogin: true,
				role: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: pageSize,
		});
		const countUsers = await prisma.user.count({
			where: {
				...(query && {
					OR: [
						{ firstName: { contains: query } },
						{ lastName: { contains: query } },
						{ email: { contains: query } },
					],
				}),
				...(status && {
					status: { equals: status },
				}),
			},
		});
		return {
			users,
			pages: Math.ceil(countUsers / pageSize),
		};
	} catch (error) {
		return;
	}
};
export const createAccountByAdmin = async (params: {
	firstName: string;
	lastName: string | null;
	email: string;
	role: string;
	password: string;
	sendMessage: boolean;
}) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin) return handleResponse(false, `You don't have permission`);

		const { firstName, lastName, email, role, password, sendMessage } =
			params;
		const userExist = await prisma.user.findUnique({
			where: {
				email,
			},
			select: {
				id: true,
			},
		});
		if (userExist) return handleResponse(false, 'User already exists');
		const bcryptPass = await bcryptPassword(password);

		await prisma.user.create({
			data: {
				firstName,
				lastName,
				email,
				password: bcryptPass,
				status: 'ACTIVE',
				isVerified: true,
				role: role as UserRole,
			},
			select: {
				id: true,
			},
		});
		revalidatePath('/admin/user', 'page');
		if (sendMessage) {
			try {
				await sendMail({
					email,
					subject: 'Account activation email',
					template: `<h1>Account created successfully</h1>`,
				});
				return handleResponse(true, `New account created successfully`);
			} catch (error) {
				return handleResponse(
					false,
					`New account created successfully, but email sending failed`,
				);
			}
		} else {
			return handleResponse(true, `New account created successfully`);
		}
	} catch (error) {
		return handleResponse(false, `New user created failed`);
	}
};
export const fetchUserProfileById = async (params: { id: string }) => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin) return;

		const user = await prisma.user.findUnique({
			where: {
				id: params.id,
			},
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				role: true,
				status: true,
			},
		});
		return user;
	} catch (error) {
		return;
	}
};
export const updateUserProfileByAdmin = async (params: {
	id: string;
	data: UpdateUserByAdmin;
}) => {
	try {
		const { data, id } = params;
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin) return handleResponse(false, `You don't have permission`);

		const userExist = await prisma.user.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
			},
		});
		if (!userExist) return handleResponse(false, `Account does not exist`);

		const updateInfo = {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			role: data.role,
			status: data.status,
			password: data.password
				? await bcryptPassword(data.password)
				: undefined,
		};

		const updated = await prisma.user.update({
			where: {
				id: userExist.id,
			},
			data: updateInfo,
			select: {
				id: true,
				email: true,
				firstName: true,
				lastName: true,
				role: true,
			},
		});
		revalidatePath('/admin/user', 'page');
		if (data.sendMessage) {
			await sendMail({
				email: updated.email,
				subject: 'Account activation email',
				template: `<h1>Account info:</br>
				Fullname: ${updated.firstName} ${updated.lastName}</br>
				Email: ${updated.email}</br>
				Role: ${updated.role}</br>
				${data.password ? `Password: ${data.password}` : ``}
				</h1>`,
			});
		}

		return handleResponse(true, `Account updated successfully`);
	} catch (error) {
		return handleResponse(false, `Account update failed`);
	}
};
export const fetchProfileMenu = async () => {
	try {
		const accessToken = cookies().get('vietfood_access_token')?.value;
		const refreshToken = cookies().get('vietfood_refresh_token')?.value;

		const authenticated = await isAuthenticated({
			accessToken: accessToken ? accessToken : null,
			refreshToken: refreshToken ? refreshToken : null,
		});
		if (!authenticated) return;

		const userExist = await prisma.user.findUnique({
			where: {
				id: authenticated.id,
				status: 'ACTIVE',
				isVerified: true,
			},
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				role: true,
			},
		});
		if (!userExist) return;

		return {
			...userExist,
		};
	} catch (error) {
		return;
	}
};
export const fetchAdminProfile = async () => {
	try {
		const isAdmin = await isAuthenticatedAdmin();
		if (!isAdmin) return;

		const profile = await prisma.user.findUnique({
			where: {
				id: isAdmin.id,
				status: 'ACTIVE',
				isVerified: true,
			},
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				createdAt: true,
			},
		});
		const avatar = await prisma.avatar.findUnique({
			where: {
				userId: profile?.id,
			},
		});
		return {
			profile,
			avatar,
		};
	} catch (error) {
		return;
	}
};
/* ================================== */
// Check user authentications
/* ================================== */
export const isAuthenticatedAdmin = async () => {
	try {
		const accessToken = cookies().get('vietfood_access_token')?.value;
		const refreshToken = cookies().get('vietfood_refresh_token')?.value;

		const authenticated = await isAuthenticated({
			accessToken: accessToken ? accessToken : null,
			refreshToken: refreshToken ? refreshToken : null,
		});
		if (!authenticated || authenticated.role !== 'ADMIN') return;

		const userExist = await prisma.user.findUnique({
			where: {
				id: authenticated.id,
				status: 'ACTIVE',
				isVerified: true,
				role: 'ADMIN',
			},
			select: {
				id: true,
				status: true,
				isVerified: true,
				role: true,
			},
		});
		if (!userExist) return;

		return {
			id: userExist.id,
		};
	} catch (error) {
		return;
	}
};
export const isAuthenticatedCheck = async () => {
	try {
		const accessToken = cookies().get('vietfood_access_token')?.value;
		const refreshToken = cookies().get('vietfood_refresh_token')?.value;

		const authenticated = await isAuthenticated({
			accessToken: accessToken ? accessToken : null,
			refreshToken: refreshToken ? refreshToken : null,
		});
		if (!authenticated) return;

		const userExist = await prisma.user.findUnique({
			where: {
				id: authenticated.id,
				status: 'ACTIVE',
				isVerified: true,
			},
			select: {
				id: true,
				status: true,
				isVerified: true,
				role: true,
			},
		});
		if (!userExist) return;

		return {
			id: userExist.id,
		};
	} catch (error) {
		return;
	}
};
