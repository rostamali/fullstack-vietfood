import {
	Bookmark,
	FolderOpen,
	Framer,
	ShoppingCart,
	Contact2,
	CircleUser,
	Component,
	Command,
	Truck,
	LayoutList,
	BookUser,
	ArrowDownUp,
} from 'lucide-react';

export const AdminNavlinks = [
	{
		label: 'Dashboard',
		url: '/admin',
		icon: Component,
	},
	{
		label: 'Files',
		url: '/admin/files',
		icon: FolderOpen,
	},
	{
		label: 'Products',
		url: '/admin/product',
		icon: Command,
	},
	{
		label: 'Brands',
		url: '/admin/product/brand',
		icon: Framer,
	},
	{
		label: 'Categories',
		url: '/admin/product/category',
		icon: Bookmark,
	},
	{
		label: 'Orders',
		url: '/dashboard/customers',
		icon: ShoppingCart,
	},
	{
		label: 'Tax',
		url: '/admin/tax',
		icon: LayoutList,
	},
	{
		label: 'Shipping',
		url: '/admin/shipping',
		icon: Truck,
	},
	{
		label: 'Users',
		url: '/admin/user',
		icon: Contact2,
	},
	{
		label: 'Profile',
		url: '/admin/profile',
		icon: CircleUser,
	},
];
export const UserNavlinks = [
	{
		label: 'Account',
		url: '/user/account',
		icon: Component,
	},
	{
		label: 'Orders',
		url: '/user/order',
		icon: ArrowDownUp,
	},
	{
		label: 'Address',
		url: '/user/address',
		icon: BookUser,
	},
	{
		label: 'Profile',
		url: '/user/Profile',
		icon: CircleUser,
	},
];
/* ======================================= */
// User Constants
/* ======================================= */
export const UserStatus = [
	{
		label: 'Active',
		value: 'ACTIVE',
	},
	{
		label: 'Inactive',
		value: 'INACTIVE',
	},
];
export const UserRoles = [
	{
		label: 'Admin',
		value: 'ADMIN',
	},
	{
		label: 'User',
		value: 'USER',
	},
];
export const FileTypes = [
	{
		label: 'Images',
		value: 'image',
	},
	{
		label: 'Videos',
		value: 'video',
	},
	{
		label: 'Documents',
		value: 'application',
	},
];
export const FileFilters = [
	{
		label: 'All',
		value: 'all',
	},
	...FileTypes,
];
export const UserPages = [
	{
		label: 'Publish',
		url: '/admin/user',
	},
	{
		label: 'Trash',
		url: '/admin/user/trash',
	},
];
export const ProductPageLinks = [
	{
		label: 'Publish',
		url: '/admin/product?status=publish',
	},
	{
		label: 'Trash',
		url: '/admin/product?status=trash',
	},
];
export const ShipPageLinks = [
	{
		label: 'Shipping Zones',
		url: '/admin/shipping',
	},
	{
		label: 'Shipping Methods',
		url: '/admin/shipping/methods',
	},
	{
		label: 'Shipping Class',
		url: '/admin/shipping/class',
	},
];
export const ShipMethodList = [
	{
		label: 'Flat Method',
		value: 'FLAT_RATE',
	},
	{
		label: 'Free Shipping',
		value: 'FREE_SHIPPING',
	},
	{
		label: 'Locak Pickup',
		value: 'LOCAL_PICKUP',
	},
];
export const TaxStatusList = [
	{
		label: 'Taxable',
		value: 'TAXABLE',
	},
	{
		label: 'None',
		value: 'NONE',
	},
];
export const FreeShipRequired = [
	{
		label: 'A minimum order amount',
		value: 'MINI_ORDER_AMOUNT',
	},
	{
		label: 'A valid free coupon',
		value: 'COUPON',
	},
];

export const invoices = [
	{
		invoice: 'INV001',
		paymentStatus: 'Paid',
		totalAmount: '$250.00',
		paymentMethod: 'Credit Card',
	},
	{
		invoice: 'INV002',
		paymentStatus: 'Pending',
		totalAmount: '$150.00',
		paymentMethod: 'PayPal',
	},
	{
		invoice: 'INV003',
		paymentStatus: 'Unpaid',
		totalAmount: '$350.00',
		paymentMethod: 'Bank Transfer',
	},
	{
		invoice: 'INV004',
		paymentStatus: 'Paid',
		totalAmount: '$450.00',
		paymentMethod: 'Credit Card',
	},
	{
		invoice: 'INV005',
		paymentStatus: 'Paid',
		totalAmount: '$550.00',
		paymentMethod: 'PayPal',
	},
	{
		invoice: 'INV006',
		paymentStatus: 'Pending',
		totalAmount: '$200.00',
		paymentMethod: 'Bank Transfer',
	},
	{
		invoice: 'INV007',
		paymentStatus: 'Unpaid',
		totalAmount: '$300.00',
		paymentMethod: 'Credit Card',
	},
];
