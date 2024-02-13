'use server';
import * as z from 'zod';
import { cookies } from 'next/headers';
import {
	UserRoleFormat,
	UserStatusFormat,
	handleResponse,
} from '../helpers/formater';
import prisma from '../prisma';
import {
	bcryptPassword,
	compareCode,
	comparePassword,
} from '../helpers/bcrypt-code';
import {
	createEmailVerifyToken,
	isAuthEdge,
	sendAuthToken,
	verifyEmailConfirmToken,
} from '../helpers/jwt-token';
import sendMail from '../helpers/send-mail';
import { verifyEmailTokenOptions } from '../helpers/cookie-options';
import { revalidatePath } from 'next/cache';
import { AccountStatus } from '@prisma/client';
import {
	ChangePasswordFormSchema,
	LoginFormSchema,
	RegisterFormSchema,
} from '../helpers/form-validation';

export const signupUser = async (
	params: z.infer<typeof RegisterFormSchema>,
) => {
	try {
		const { firstName, lastName, email, password } = params;
		const userExist = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		if (userExist) return handleResponse(false, 'Account already exists');
		const bcryptPass = await bcryptPassword(password);
		const user = {
			firstName,
			lastName,
			email,
			password: bcryptPass,
		};
		const { token, code } = await createEmailVerifyToken(user);

		await sendMail({
			email,
			subject: 'Activate your account',
			template: `email-verification.ejs`,
			data: {
				code,
			},
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
export const loginUser = async (params: z.infer<typeof LoginFormSchema>) => {
	try {
		const { email, password, remember = false } = params;
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
export const logoutUser = async () => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth)
			return handleResponse(false, `You don't have a permission`);

		cookies().delete('vietfood_access_token');
		cookies().delete('vietfood_refresh_token');
		revalidatePath('/', 'page');
		return handleResponse(true, `Logged out successfully`);
	} catch (error) {
		return handleResponse(false, `Logout action failed`);
	}
};
export const importUsersFromCSV = async (params: CSVUser[]) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth || isAuth.role !== 'ADMIN')
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

		revalidatePath('/admin/user');
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
		const isAuth = await isAuthenticated();
		if (!isAuth || isAuth.role !== 'ADMIN') return;

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
	status: string;
}) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth || isAuth.role !== 'ADMIN')
			return handleResponse(false, `You don't have permission`);

		const {
			firstName,
			lastName,
			email,
			role,
			password,
			sendMessage,
			status,
		} = params;
		const userExist = await prisma.user.findUnique({
			where: {
				email,
			},
			select: {
				id: true,
			},
		});
		if (userExist) return handleResponse(false, 'User already exists');
		const bcryptPass = await bcryptPassword(password as string);

		const newUser = await prisma.user.create({
			data: {
				firstName,
				lastName,
				email,
				password: bcryptPass,
				status: status as AccountStatus,
				isVerified: true,
				role: role as UserRole,
			},
			select: {
				id: true,
				email: true,
				role: true,
			},
		});
		revalidatePath('/admin/user', 'page');
		if (sendMessage) {
			try {
				await sendMail({
					email,
					subject:
						'Welcome to Vietfood - Your Account has been Created!',
					template: `new-account.ejs`,
					data: {
						name: `${firstName} ${lastName}`,
						email: newUser.email,
						role: UserRoleFormat[newUser.role],
						password,
					},
				});

				return handleResponse(true, `New account created successfully`);
			} catch (error) {
				return handleResponse(
					false,
					`New account created successfully, but email sending failed`,
				);
			}
		} else {
			return handleResponse(true, `Account created successfully`);
		}
	} catch (error) {
		return handleResponse(false, `Account create action failed`);
	}
};
export const fetchUserProfileById = async (params: { id: string }) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth || isAuth.role !== 'ADMIN') return;

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
		const isAuth = await isAuthenticated();
		if (!isAuth || isAuth.role !== 'ADMIN')
			return handleResponse(false, `You don't have permission`);

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
				status: true,
			},
		});
		revalidatePath('/admin/user', 'page');
		if (data.sendMessage) {
			await sendMail({
				email: updated.email,
				subject: 'Updated your account at Vietfood',
				template: `update-account.ejs`,
				data: {
					name: `${updated.firstName} ${updated.lastName}`,
					email: updated.email,
					role: UserRoleFormat[updated.role],
					status: UserStatusFormat[updated.status],
					password: data.password,
				},
			});
		}

		return handleResponse(true, `Account updated successfully`);
	} catch (error) {
		return handleResponse(false, `Account update failed`);
	}
};
export const fetchProfileMenu = async () => {
	try {
		const isAuth = await isAuthenticated();

		if (!isAuth) return;
		const userExist = await prisma.user.findUnique({
			where: {
				id: isAuth.id,
				status: 'ACTIVE',
				isVerified: true,
			},
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				role: true,
				avatar: {
					select: {
						url: true,
					},
				},
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
		const isAuth = await isAuthenticated();
		if (!isAuth || isAuth.role !== 'ADMIN') return;

		const profile = await prisma.user.findUnique({
			where: {
				id: isAuth.id,
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
export const deleteUserByAdmin = async (params: {
	ids: string[];
	actionType: 'DEACTIVE' | 'DELETE';
}) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth || isAuth.role !== 'ADMIN')
			return handleResponse(false, `You don't have permission`);

		if (params.actionType === 'DELETE') {
			await prisma.user.deleteMany({
				where: {
					id: {
						in: params.ids,
					},
				},
			});
			revalidatePath('/admin/user');
			return handleResponse(true, `Account deleted successfully`);
		} else {
			await prisma.user.updateMany({
				where: {
					id: {
						in: params.ids,
					},
				},
				data: {
					status: 'INACTIVE',
				},
			});
			revalidatePath('/admin/user');
			return handleResponse(true, `Account deactivated successfully`);
		}
	} catch (error) {
		return handleResponse(false, `Account action failed`);
	}
};
export const updateAccountPassword = async (
	params: z.infer<typeof ChangePasswordFormSchema>,
) => {
	try {
		const isAuth = await isAuthenticated();
		if (!isAuth) return handleResponse(false, `You don't have permission`);

		const { oldPassword, newPassword } = params;
		const authExist = await prisma.user.findUnique({
			where: {
				id: isAuth.id,
				status: 'ACTIVE',
				isVerified: true,
			},
			select: {
				id: true,
				password: true,
			},
		});
		if (!authExist) return handleResponse(false, `User doesn't exist`);

		const isPasswordMatch = await comparePassword(
			oldPassword,
			authExist.password,
		);
		if (!isPasswordMatch)
			return handleResponse(false, `Password is incorrect`);

		const bcryptPass = await bcryptPassword(newPassword);
		await prisma.user.update({
			where: {
				id: authExist.id,
			},
			data: {
				password: bcryptPass,
			},
		});
		cookies().delete('vietfood_access_token');
		cookies().delete('vietfood_refresh_token');
		revalidatePath('/auth/login');

		return handleResponse(true, `Password changed successfully`);
	} catch (error) {
		return handleResponse(false, `Password update failed`);
	}
};
/* ================================== */
// Check user authentications
/* ================================== */

export const isAuthenticated = async () => {
	try {
		const accessToken = cookies().get('vietfood_access_token')?.value;
		const refreshToken = cookies().get('vietfood_refresh_token')?.value;

		const authenticated = await isAuthEdge({
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
			role: userExist.role,
		};
	} catch (error) {
		return;
	}
};
