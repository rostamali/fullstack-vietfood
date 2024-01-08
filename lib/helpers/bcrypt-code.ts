import bcrypt from 'bcryptjs';

export const bcryptPassword = async (password: string) => {
	return await bcrypt.hash(password, 12);
};
export const comparePassword = async (
	password: string,
	hashPassword: string,
) => {
	return await bcrypt.compare(password, hashPassword);
};
export const compareCode = async (code: string, hashCode: string) => {
	return await bcrypt.compare(code, hashCode);
};
