/* ============================== */
//  Packages types
/* ============================== */
declare module '@editorjs/header';
declare module '@editorjs/embed';
declare module '@editorjs/list';
declare module '@editorjs/inline-code';
declare module '@editorjs/code';
declare module '@editorjs/link';
declare module '@editorjs/image';
declare module '@editorjs/table';
declare module 'editorjs-parser';

/* ============================== */
//  User or Auth types
/* ============================== */
type UserStatus = 'ACTIVE' | 'INACTIVE';
type UserRole = 'USER' | 'ADMIN';
type FormTypes = 'CREATE' | 'UPDATE';

interface ITokenOptions {
	expires: Date;
	maxAge: number;
	httpOnly: boolean;
	sameSite: 'lax' | 'strict' | 'none' | undefined;
	secure?: boolean;
}
interface UserList {
	id: string;
	firstName: string;
	lastName: string | null;
	email: string;
	status: UserStatus;
	lastLogin: Date | null;
	createdAt: Date;
	role: UserRole;
}
interface UpdateUserByAdmin {
	firstName: string;
	lastName: string;
	email: string;
	password: string | null;
	role: UserRole;
	status: UserStatus;
	sendMessage: boolean;
}

/* ============================== */
//  File library types
/* ============================== */
interface FileLibraryType {
	id: string;
	fileType: string;
	title: string;
	url: string;
}
interface FileDetailsView {
	id: string;
	title: string;
	fileName: string;
	fileType: string;
	description: string | null;
	url: string;
	size: string;
	createdAt: Date;
	isCompress: boolean;
	compressPercent: number | null;
	author: {
		role: UserRole;
		firstName: string;
		lastName: string | null;
	};
}
interface FileSelection {
	id: string;
	fileType: string;
	title: string;
	url: string;
}
interface ModalLibraryFiles {
	data: FileSelection[] | null;
	type: loadType;
	page: number;
	pageSize: number;
	isNext: boolean;
}

/* ============================== */
//  Category types
/* ============================== */
interface CategorySelectList {
	id: string;
	name: string;
	slug: string;
}
interface CategoryTable {
	id: string;
	description: string | null;
	name: string;
	slug: string;
	isActive: boolean;
	thumbnail: {
		id: string;
		title: string;
		description: string | null;
		fileType: string;
		fileName: string;
		url: string;
	} | null;
	parentCategory: {
		slug: string;
		name: string;
	} | null;
}

/* ============================== */
//  Brand types
/* ============================== */

interface BrandTable {
	id: string;
	name: string;
	description: string | null;
	thumbnail: {
		id: string;
		fileName: string;
		fileType: string;
		title: string;
		url: string;
	} | null;
	slug: string;
	isActive: boolean;
	contactName: string | null;
	contactEmail: string | null;
	contactPhone: string | null;
	contactWebsite: string | null;
}

/* ============================== */
//  Shipping Types
/* ============================== */
type taxStatusType = 'TAXABLE' | 'NONE';
type shipMethodType = 'FLAT_RATE' | 'FREE_SHIPPING' | 'LOCAL_PICKUP';
interface ShipClassList {
	id: string;
	name: string;
	description: string | null;
	createdAt: Date;
}

interface ShipMethodList {
	id: string;
	name: string;
	type: shipMethodType;
	taxStatus: taxStatusType;
	active: boolean;
}
interface ShipMethodsForm {
	name: string;
	taxStatus: string;
}
type regions = {
	isoCode: string;
	type: string;
};
interface ZoneMethods {
	id: string;
	name: string;
}
interface ShipZoneForm {
	name: string;
	regions: regions[] | null;
	methods: ZoneMethods | null;
}

interface ShipZoneList {
	id: string;
	name: string;
	regions: {
		name: string;
		locationType: string;
	}[];
	methods: {
		name: string;
	}[];
}

interface LocalUpdateForm {
	id: string;
	name: string;
	taxStatus: taxStatusType;
}

/* ============================== */
//  Product Types
/* ============================== */
type ProductStatus = 'PUBLISH' | 'DRAFT';
type ProductActionTypes = 'DELETE' | 'DRAFT';
interface ProductList {
	id: string;
	name: string;
	thumbnail: {
		title: string;
		id: string;
		url: string;
		fileType: string;
	} | null;
	slug: string;
	status: ProductStatus;
	createdAt: Date;
	inventory: {
		regularPrice: number | null;
		salePrice: number | null;
		inStock: boolean;
	} | null;
}
interface ProductCardProps {
	id: string;
	name: string;
	slug: string;
	thumbnail: {
		id: string;
		fileType: string;
		title: string;
		url: string;
	} | null;
	inventory: {
		regularPrice: number | null;
		salePrice: number | null;
		inStock: boolean;
	} | null;
}
interface CategoryCardProps {
	id: string;
	name: string;
	slug: string;
	thumbnail: {
		fileType: string;
		fileName: string;
	} | null;
}

/* ============================== */
//  Address Types
/* ============================== */
interface AddressCard {
	id: string;
	contactName: string;
	phoneNumber: string;
	country: string | undefined;
	state: string | undefined;
	city: string | null;
	zipCode: string;
	address: string;
	defaultAddress: boolean;
}
/* ============================== */
//  Tax Rate Types
/* ============================== */
interface TaxList {
	name: string;
	country: string | null;
	state: string | null;
	taxRate: number;
	priority: number;
	id: string;
	taxLocations: {
		locationCode: string;
	}[];
}

/* ============================== */
//  Cart Types
/* ============================== */
interface AddToCart {
	quantity: number;
	productId: string;
}
interface CartCustomItems {
	cartItemId: string;
	quantity: number;
	name: string;
	shipClass: {
		id: string;
		name: string;
	} | null;
	thumbnail: string | null;
	category: string;
	unitPrice: number;
	totalCost: number;
}
interface CheckoutItems {
	cartItemId: string;
	name: string;
	thumbnail: string | null;
	category: string;
	quantity: number;
	unitPrice: number;
	totalCost: number;
}

/* ============================== */
//  CSV file types
/* ============================== */
interface CSVUser {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	bio: string | null;
}
interface CSVCategory {
	name: string;
	description: string;
}
interface CSVBrand {
	name: string;
	description: string;
	contactName: string;
	contactEmail: string;
	contactPhone: string;
	contactWebsite: string;
}
interface CSVProduct {
	name: string;
	excerpt: string;
	retailPrice: string;
	salePrice: string;
	threshold: string;
	sku: string;
}

/* ============================== */
//  Options types
/* ============================== */
interface ClassListCost {
	classId: string;
	className: string;
	cost: number;
}
interface FlatMethodOptions {
	cost: number;
	classList: ClassListCost[];
}
interface FreeMethodOptions {
	required: 'MINI_ORDER_AMOUNT' | 'COUPON';
	miniOrderAmount?: number;
}
interface SelectedFlat {
	name: string;
	cost: number;
	classList: ClassListCost;
}
interface SelectedFree {
	name: string;
	miniOrderAmount: number;
}

interface SelectedMethod {
	method: 'FLAT' | 'FREE';
	name: string;
	cost: number | ('FLAT' extends typeof method ? null : number);
}
