import * as z from 'zod';
/* ================================== */
// User Schemas
/* ================================== */
const UserRole = ['ADMIN', 'USER'];
const UserStatus = ['ACTIVE', 'INACTIVE'];

export const LoginFormSchema = z.object({
	email: z
		.string({
			invalid_type_error: 'Email Must be valid',
			required_error: 'Email is required',
		})
		.min(1, { message: 'Email is required' })
		.email({
			message: 'Email Must be valid',
		}),
	password: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'Password must be atleast 6 characters' }),
	remember: z.boolean(),
});
export const RegisterFormSchema = z.object({
	firstName: z
		.string({
			required_error: 'Name is required',
		})
		.min(1, { message: 'Firstname is required' })
		.max(30, { message: 'Firstname must not exceed 30 characters' }),
	lastName: z.string(),
	email: z
		.string({
			invalid_type_error: 'Email Must be valid',
			required_error: 'Email is required',
		})
		.min(1, { message: 'Email is required' })
		.email({
			message: 'Must be a valid email',
		}),
	password: z
		.string()
		.min(6, { message: 'Password must be atleast 6 characters' })
		.max(12, { message: 'Password must be within 12 characters' }),
});
export const CreateUserFormSchema = z.object({
	firstName: z
		.string({
			required_error: 'Name is required',
		})
		.min(1, { message: 'Firstname is required' })
		.max(30, { message: 'Firstname must not exceed 30 characters' }),
	lastName: z.string(),
	email: z
		.string({
			invalid_type_error: 'Email Must be valid',
			required_error: 'Email is required',
		})
		.min(1, { message: 'Email is required' })
		.email({
			message: 'Must be a valid email',
		}),
	role: z
		.string({
			required_error: 'Role is required',
		})
		.refine((value) => UserRole.includes(value), {
			message: 'Role must be one of the options: ' + UserRole.join(', '),
		})
		.refine(
			(value) => value !== undefined && value !== null && value !== '',
			{
				message: 'Role is required',
			},
		),
	password: z
		.string()
		.min(6, { message: 'Password must be atleast 6 characters' })
		.max(12, { message: 'Password must be within 12 characters' }),
	sendMessage: z.boolean(),
});
export const UpdateUserFormSchema = z.object({
	firstName: z
		.string({
			required_error: 'Name is required',
		})
		.min(1, { message: 'Firstname is required' })
		.max(30, { message: 'Firstname must not exceed 30 characters' }),
	lastName: z.string(),
	email: z
		.string({
			invalid_type_error: 'Email Must be valid',
			required_error: 'Email is required',
		})
		.min(1, { message: 'Email is required' })
		.email({
			message: 'Must be a valid email',
		}),
	role: z
		.string({
			required_error: 'Role is required',
		})
		.refine((value) => UserRole.includes(value), {
			message: 'Role must be one of the options: ' + UserRole.join(', '),
		})
		.refine(
			(value) => value !== undefined && value !== null && value !== '',
			{
				message: 'Role is required',
			},
		),
	status: z
		.string({
			required_error: 'Status is required',
		})
		.refine((value) => UserStatus.includes(value), {
			message:
				'Status must be one of the options: ' + UserStatus.join(', '),
		})
		.refine(
			(value) => value !== undefined && value !== null && value !== '',
			{
				message: 'Status is required',
			},
		),
	password: z
		.string()
		.min(6, { message: 'Password must be atleast 6 characters' })
		.max(12, { message: 'Password must be within 12 characters' })
		.nullable(),
	sendMessage: z.boolean(),
});

/* ================================== */
// Files Schemas
/* ================================== */
export const FileUpdateFormSchema = z.object({
	title: z
		.string()
		.min(1, { message: 'File name is required' })
		.max(30, { message: 'File name must not exceed 30 characters' }),
	description: z
		.string()
		.max(150, { message: 'Description must not exceed 150 characters' }),
});
export const FileSchema = z.object({
	id: z.string(),
	url: z.string(),
	title: z.string(),
	fileType: z.string(),
});
export const ProfilePictureSchema = z.object({
	thumbnail: z.array(FileSchema),
});
/* ================================== */
// Category Schema
/* ================================== */
export const CategoryFormSchema = z.object({
	name: z
		.string()
		.min(1, { message: 'Name is required' })
		.max(30, { message: 'Name must not exceed 30 characters' }),
	thumbnail: z.array(FileSchema).nullable(),
	parent: z.string().nullable(),
	description: z
		.string()
		.max(150, { message: 'Description must not exceed 150 characters' }),
});
/* ================================== */
// Brand Schema
/* ================================== */
export const BrandFormSchema = z.object({
	name: z
		.string()
		.min(1, { message: 'Name is required' })
		.max(30, { message: 'Name must not exceed 30 characters' }),
	thumbnail: z.array(FileSchema).nullable(),
	contactName: z.string().optional(),
	contactEmail: z.string().optional(),
	contactPhone: z.string().optional(),
	contactWebsite: z.string().optional(),
	description: z
		.string()
		.max(150, { message: 'Description must not exceed 150 characters' }),
});
