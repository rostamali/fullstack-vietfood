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
	PhoneCall,
	AtSign,
	Home,
	Facebook,
	Twitter,
	Instagram,
} from 'lucide-react';
export const TopbarLinks = [
	{
		label: 'About',
		url: '/adbout',
	},
	{
		label: 'Wishlist',
		url: '/wishlist',
	},
	{
		label: 'Compare',
		url: '/compare',
	},
];
export const NavbarLinks = [
	{
		label: 'New Products',
		url: '/',
	},
	{
		label: 'Best Sales',
		url: '/',
	},
	{
		label: 'Shops',
		url: '/shop',
	},
	{
		label: 'Categories',
		url: '/categories',
	},
];
export const UsefullLinks = [
	{
		label: 'My Account',
		url: '/',
	},
	{
		label: 'Wishlist',
		url: '/',
	},
	{
		label: 'About us',
		url: '/',
	},
	{
		label: 'Contact Us',
		url: '/',
	},
];
export const QuickContact = [
	{
		label: 'Carol J. Stephens Mongomery, Al 36104 USA',
		icon: Home,
	},
	{
		label: '+000 123 456',
		icon: PhoneCall,
	},
	{
		label: 'hello@store.com',
		icon: AtSign,
	},
];
export const SocialLinks = [
	{
		url: '',
		icon: Facebook,
	},
	{
		url: '',
		icon: Twitter,
	},
	{
		url: '',
		icon: Instagram,
	},
];
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
		url: '/admin/store/brand',
		icon: Framer,
	},
	{
		label: 'Categories',
		url: '/admin/store/category',
		icon: Bookmark,
	},
	{
		label: 'Orders',
		url: '/admin/store/order',
		icon: ShoppingCart,
	},
	{
		label: 'Tax',
		url: '/admin/store/tax',
		icon: LayoutList,
	},
	{
		label: 'Shipping',
		url: '/admin/store/shipping',
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
// Shop Constants
/* ======================================= */
export const BrandList = [
	{
		label: 'HP',
	},
	{
		label: 'Samsung',
	},
	{
		label: 'Kitchen',
	},
	{
		label: 'Wall Clock',
	},
	{
		label: 'Accessories',
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
export const UserAction = [
	{
		label: 'Deactive User',
		value: 'DEACTIVE',
	},
	{
		label: 'Delete User',
		value: 'DELETE',
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
		url: '/admin/store/shipping',
	},
	{
		label: 'Shipping Class',
		url: '/admin/store/shipping/class',
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
export const ProductStatus = [
	{
		label: 'Publish',
		value: 'ACTIVE',
	},
	{
		label: 'Draft',
		value: 'INACTIVE',
	},
];
export const StockStatus = [
	{
		label: 'In Stock',
		value: 'true',
	},
	{
		label: 'Ouf of Stock',
		value: 'false',
	},
];
