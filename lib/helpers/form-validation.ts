import * as z from 'zod';
/* ================================== */
// User Schemas
/* ================================== */
const UserRole = ['ADMIN', 'USER'];
const FormTypes = ['CREATE', 'UPDATE'];
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
export const UserFormSchema = z
	.object({
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
				message:
					'Role must be one of the options: ' + UserRole.join(', '),
			})
			.refine(
				(value) =>
					value !== undefined && value !== null && value !== '',
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
					'Status must be one of the options: ' +
					UserStatus.join(', '),
			})
			.refine(
				(value) =>
					value !== undefined && value !== null && value !== '',
				{
					message: 'Status is required',
				},
			),
		type: z
			.string({
				required_error: 'Type is required',
			})
			.refine((value) => FormTypes.includes(value), {
				message:
					'Type must be one of the options: ' + FormTypes.join(', '),
			})
			.refine(
				(value) =>
					value !== undefined && value !== null && value !== '',
				{
					message: 'Type is required',
				},
			),
		password: z
			.string()
			.min(6, { message: 'Password must be atleast 6 characters' })
			.max(12, { message: 'Password must be within 12 characters' })
			.nullable(),
		sendMessage: z.boolean(),
	})
	.refine((input) => {
		// allows bar to be optional only when foo is 'foo'
		if (input.type !== 'UPDATE' && input.password === undefined)
			return false;

		return true;
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

/* ================================== */
// Shipping Schemaa
/* ================================== */
const Zones = ['COUNTRY', 'STATE'];
const TaxStatus = ['TAXABLE', 'NONE'];
const freeShipCondition = ['MINI_ORDER_AMOUNT', 'COUPON'];

const ShipClassCost = z.object({
	classId: z.string().min(1, { message: 'Class ID is required' }),
	className: z.string().min(1, { message: 'Class name is required' }),
	cost: z.coerce
		.string({
			invalid_type_error: 'Class cost must be a number',
		})
		.transform((value) =>
			value === undefined || value === null ? undefined : Number(value),
		),
});
const ShipZoneTypeSchema = z.object({
	type: z
		.string({
			required_error: 'Zone type is required',
		})
		.refine((value) => Zones.includes(value), {
			message:
				'Zone type must be one of the options: ' + Zones.join(', '),
		})
		.refine(
			(value) => value !== undefined && value !== null && value !== '',
			{
				message: 'Zone type is required',
			},
		),
	isoCode: z
		.string()
		.max(150, { message: 'Description must not exceed 150 characters' }),
});
export const ShipClassSchema = z.object({
	name: z
		.string()
		.min(1, { message: 'Name is required' })
		.max(30, { message: 'Name must not exceed 30 characters' }),
	description: z
		.string()
		.max(150, { message: 'Description must not exceed 150 characters' }),
});
const ZoneObject = z.object({
	name: z.string({
		required_error: 'Name is required',
	}),
	id: z.string({
		required_error: 'Name is required',
	}),
});
export const ShipZoneSchema = z.object({
	name: z
		.string()
		.min(1, { message: 'Name is required' })
		.max(30, { message: 'Name must not exceed 30 characters' }),
	regions: z.array(ShipZoneTypeSchema).nullable(),
	methods: z.array(ZoneObject).nullable(),
});
export const FlatMethodSchema = z.object({
	name: z
		.string({
			required_error: 'Name is required',
		})
		.min(1, { message: 'Name is required' })
		.max(30, { message: 'Name must not exceed 30 characters' }),
	taxStatus: z.string().min(1, { message: 'Tax status is required' }),
	cost: z.coerce
		.number({
			invalid_type_error: 'Cost must be a number',
		})
		.refine((value) => !isNaN(value) && value >= 0, {
			message: 'Cost must be a non-negative number',
		})
		.transform((value) =>
			value === undefined || value === null ? 0 : Number(value),
		),
	noClassCost: z.coerce
		.string({
			invalid_type_error: 'No Shipping class cost must be a number',
		})
		.transform((value) =>
			value === undefined || value === null ? undefined : Number(value),
		),
	classList: z.array(ShipClassCost),
});
export const FreeShipMethodSchema = z.object({
	name: z
		.string({
			required_error: 'Name is required',
		})
		.min(1, { message: 'Name is required' })
		.max(30, { message: 'Name must not exceed 30 characters' }),
	required: z
		.string({
			required_error: 'Condition is required',
		})
		.refine((value) => freeShipCondition.includes(value), {
			message:
				'Condition must be one of the options: ' +
				freeShipCondition.join(', '),
		})
		.refine(
			(value) => value !== undefined && value !== null && value !== '',
			{
				message: 'Condition is required',
			},
		),
	miniOrderAmount: z.coerce
		.string({
			invalid_type_error: 'Minimum order amount must be a number',
		})
		.transform((value) =>
			value === undefined || value === null ? undefined : Number(value),
		),
});
export const LocalPickupMethodSchema = z.object({
	name: z
		.string({
			required_error: 'Name is required',
		})
		.min(1, { message: 'Name is required' })
		.max(30, { message: 'Name must not exceed 30 characters' }),
	taxStatus: z
		.string({
			required_error: 'Tax status is required',
		})
		.refine((value) => TaxStatus.includes(value), {
			message:
				'Tax status must be one of the options: ' +
				TaxStatus.join(', '),
		})
		.refine(
			(value) => value !== undefined && value !== null && value !== '',
			{
				message: 'Tax status is required',
			},
		),
	cost: z.coerce
		.string({
			invalid_type_error: 'Cost amount must be a number',
		})
		.transform((value) =>
			value === undefined || value === null ? undefined : Number(value),
		),
});
