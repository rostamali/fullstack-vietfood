import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';
import { cookies } from 'next/headers';
import {
	accessTokenOptions,
	refreshTokenOptions,
	rememberAccessTokenOptions,
} from './cookie-options';
import { NextResponse } from 'next/server';

const alg = 'HS256';

/* ============================================= */
// Get all the token secret keys
/* ============================================= */
export const getEmailVerifySecret = () => {
	const secret = process.env.JWT_EMAIL_VERIFY_SECRET;
	if (!secret || secret.length === 0) {
		throw new Error('Email verify token secret is required');
	}
	return secret;
};
export const getAccessTokenSecret = () => {
	const secret = process.env.JWT_ACCESS_TOKEN_SECRET;
	if (!secret || secret.length === 0) {
		throw new Error('Access token secret is required');
	}
	return secret;
};
export const getRefreshTokenSecret = () => {
	const secret = process.env.JWT_REFRESH_TOKEN_SECRET;
	if (!secret || secret.length === 0) {
		throw new Error('Refresh token secret is required');
	}
	return secret;
};
export const getForgotPasswordTokenSecret = () => {
	const secret = process.env.JWT_FORGOT_PASSWORD_TOKEN_SECRET;
	if (!secret || secret.length === 0) {
		throw new Error('Forgot password token secret is required');
	}
	return secret;
};

/* ============================================= */
// Create all the token using JOSE
/* ============================================= */
export const createEmailVerifyToken = async (user: RegisterUser) => {
	const code = Math.floor(100000 + Math.random() * 900000).toString();
	const hashedCode = bcrypt.hashSync(code, 10);

	const token = await new SignJWT({ ...user, code: hashedCode })
		.setProtectedHeader({ alg })
		.setIssuedAt()
		.setExpirationTime(
			process.env.JWT_EMAIL_VERIFY_SECRET_EXPIRES_IN as string,
		)
		.sign(new TextEncoder().encode(getEmailVerifySecret()));

	return { token, code };
};
export const createAccessToken = async (id: string, role: string) => {
	return await new SignJWT({ id, role })
		.setProtectedHeader({ alg })
		.setIssuedAt()
		.setExpirationTime(
			process.env.JWT_ACCESS_TOKEN_SECRET_EXPIRES_IN as string,
		)
		.sign(new TextEncoder().encode(getAccessTokenSecret()));
};
export const createRememberAccessToken = async (id: string, role: string) => {
	return await new SignJWT({ id, role })
		.setProtectedHeader({ alg })
		.setIssuedAt()
		.setExpirationTime(
			process.env.JWT_ACCESS_REMEMBER_TOKEN_SECRET_EXPIRES_IN as string,
		)
		.sign(new TextEncoder().encode(getAccessTokenSecret()));
};
export const createRefreshToken = async (id: string, role: string) => {
	return await new SignJWT({ id, role })
		.setProtectedHeader({ alg })
		.setIssuedAt()
		.setExpirationTime(
			process.env.JWT_REFRESH_TOKEN_SECRET_EXPIRES_IN as string,
		)
		.sign(new TextEncoder().encode(getRefreshTokenSecret()));
};
export const createForgotPasswordToken = async (email: string) => {
	return await new SignJWT({ email })
		.setProtectedHeader({ alg })
		.setIssuedAt()
		.setExpirationTime(
			process.env.JWT_FORGOT_PASSWORD_TOKEN_SECRET_EXPIRES_IN as string,
		)
		.sign(new TextEncoder().encode(getForgotPasswordTokenSecret()));
};

/* ============================================= */
// Verify Tokens
/* ============================================= */
export const verifyEmailConfirmToken = async (token: string) => {
	try {
		const verified = await jwtVerify(
			token,
			new TextEncoder().encode(getEmailVerifySecret()),
		);
		if (!verified) return;
		return verified.payload as {
			firstName: string;
			lastName?: string;
			email: string;
			password: string;
			code: string;
		};
	} catch (error) {
		return;
	}
};
export const verifyRefreshToken = async (token: string) => {
	try {
		const verified = await jwtVerify(
			token,
			new TextEncoder().encode(getRefreshTokenSecret()),
		);
		if (!verified) return;
		return verified.payload as {
			id: string;
			role: string;
			iat: number;
			exp: number;
		};
	} catch (error) {
		return;
	}
};
export const verifyAccessToken = async (token: string) => {
	try {
		const verified = await jwtVerify(
			token,
			new TextEncoder().encode(getAccessTokenSecret()),
		);
		return verified.payload as {
			id: string;
			role: string;
			iat: number;
			exp: number;
		};
	} catch (error) {
		return;
	}
};
export const isAuthenticated = async (params: {
	refreshToken: string | null;
	accessToken: string | null;
}) => {
	try {
		const response = NextResponse.next();

		const { refreshToken, accessToken } = params;
		if (!refreshToken || !accessToken) return;
		const verifiedRefreshToken = await verifyRefreshToken(refreshToken);
		if (!verifiedRefreshToken) {
			response.cookies.delete('vietfood_refresh_token');
			response.cookies.delete('vietfood_access_token');
			return;
		}

		const verifiedAccessToken =
			accessToken && (await verifyAccessToken(accessToken));
		if (!verifiedAccessToken) {
			const newAccessToken = await createAccessToken(
				verifiedRefreshToken.id,
				verifiedRefreshToken.role,
			);
			response.cookies.set(
				'vietfood_access_token',
				newAccessToken,
				accessTokenOptions,
			);
			return {
				id: verifiedRefreshToken.id,
				role: verifiedRefreshToken.role,
			};
		}
		return {
			id: verifiedRefreshToken.id,
			role: verifiedRefreshToken.role,
		};
	} catch (error) {
		return;
	}
};
/* ============================================= */
// Send jwt token
/* ============================================= */
export const sendAuthToken = async (
	user: {
		id: string;
		email: string;
		password: string;
		role: Role;
	},
	remember: boolean,
	message: string,
) => {
	const { id, role } = user;
	const access_token = await createAccessToken(id, role);
	const remember_access_token = await createRememberAccessToken(id, role);
	const refresh_token = await createRefreshToken(id, role);

	cookies().set(
		'vietfood_access_token',
		remember ? remember_access_token : access_token,
		remember ? rememberAccessTokenOptions : accessTokenOptions,
	);
	cookies().set('vietfood_refresh_token', refresh_token, refreshTokenOptions);
	return {
		success: true,
		message,
		email: user.email,
		role: user.role,
	};
};
