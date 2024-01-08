const verifyEmailTokenExpiresIn = 5 * 60 * 1000;
export const verifyEmailTokenOptions: ITokenOptions = {
	expires: new Date(Date.now() + verifyEmailTokenExpiresIn),
	maxAge: verifyEmailTokenExpiresIn,
	httpOnly: true,
	sameSite: 'lax',
	secure: process.env.NODE_ENV === 'production' && true,
};

const accessTokenExpiresIn = 5 * 60 * 1000;
const rememberAccessTokenExpiresIn = 1 * 24 * 60 * 60 * 1000;
const refreshTokenExpiresIn = 5 * 24 * 60 * 60 * 1000;

export const accessTokenOptions: ITokenOptions = {
	expires: new Date(Date.now() + accessTokenExpiresIn),
	maxAge: accessTokenExpiresIn,
	httpOnly: true,
	sameSite: 'lax',
	secure: process.env.NODE_ENV === 'production' && true,
};
export const rememberAccessTokenOptions: ITokenOptions = {
	expires: new Date(Date.now() + rememberAccessTokenExpiresIn),
	maxAge: rememberAccessTokenExpiresIn,
	httpOnly: true,
	sameSite: 'lax',
	secure: process.env.NODE_ENV === 'production' && true,
};
export const refreshTokenOptions: ITokenOptions = {
	expires: new Date(Date.now() + refreshTokenExpiresIn),
	maxAge: refreshTokenExpiresIn,
	httpOnly: true,
	sameSite: 'lax',
	secure: process.env.NODE_ENV === 'production' && true,
};

const verifyResetPasswordTokenExpiresIn = 5 * 60 * 1000;
export const verifyResetTokenOptions: ITokenOptions = {
	expires: new Date(Date.now() + verifyResetPasswordTokenExpiresIn),
	maxAge: verifyResetPasswordTokenExpiresIn,
	httpOnly: true,
	sameSite: 'lax',
	secure: process.env.NODE_ENV === 'production' && true,
};
