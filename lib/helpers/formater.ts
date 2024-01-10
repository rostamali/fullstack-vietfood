import slugify from 'slugify';

export const handleResponse = (success: boolean, message: string) => {
	return {
		success,
		message,
	};
};
export const dateFormat = (date: Date) => {
	return new Date(date).toLocaleString('en-US', {
		timeZone: 'UTC',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
};
export const toggleSelectAll = <T extends { id: string }>(
	data: T[],
	selectedItems: string[] | null,
	setSelectedItems: (value: string[] | null) => void,
) => {
	const categoryIds = data.map((item: T) => item.id);
	if (selectedItems) {
		if (selectedItems?.length === categoryIds?.length) {
			setSelectedItems(null);
		} else {
			setSelectedItems(categoryIds);
		}
	} else {
		setSelectedItems(categoryIds);
	}
};
export const isChecked = (selectedItems: string[] | null, id: string) => {
	const checked = selectedItems?.includes(id) ? true : false;
	return checked;
};
export const isSelectAll = <T>(data: T[], selectedItems: string[] | null) => {
	const checked = data
		? data.length === selectedItems?.length
			? true
			: false
		: false;
	return checked;
};
export const toggleSelectList = (
	selectedItems: string[] | null,
	setSelectedItems: (value: string[] | null) => void,
	itemId: string,
) => {
	if (selectedItems) {
		if (selectedItems.includes(itemId)) {
			setSelectedItems(
				selectedItems.filter((id: string) => id !== itemId),
			);
		} else {
			setSelectedItems([...selectedItems, itemId]);
		}
	} else {
		setSelectedItems([itemId]);
	}
};
export const toggleFileSelection = (
	newFile: FileSelection,
	setSelectedFiles: (value: FileSelection[] | null) => void,
	selectedFiles: FileSelection[] | null,
	gallery: boolean,
) => {
	if (gallery) {
		if (selectedFiles === null) {
			setSelectedFiles([newFile]);
		} else {
			const isSelected = selectedFiles?.find(
				(item: { id: string }) => item?.id === newFile?.id,
			);
			if (isSelected) {
				setSelectedFiles(
					(selectedFiles as FileSelection[]).filter(
						(item) => item?.id !== newFile?.id,
					),
				);
			} else {
				setSelectedFiles([...(selectedFiles || []), newFile]);
			}
		}
	} else {
		if (selectedFiles === null) {
			setSelectedFiles([newFile]);
		} else {
			if (selectedFiles.includes(newFile)) {
				setSelectedFiles(null);
			} else {
				setSelectedFiles([newFile]);
			}
		}
	}
};
export const isFileSelected = (
	file: FileSelection,
	selectedFiles: FileSelection[] | null,
) => {
	if (selectedFiles) {
		return selectedFiles?.some(
			(selectedFile) => selectedFile.id === file.id,
		);
	}
	return false;
};

// Data formater
export const ShipMethodFormat: Record<shipMethodType, string> = {
	FLAT_RATE: 'Flat Rate',
	FREE_SHIPPING: 'Free Shipping',
	LOCAL_PICKUP: 'Local Pickup',
};
export const TaxStatusFormat: Record<taxStatusType, string> = {
	TAXABLE: 'Taxable',
	NONE: 'None',
};
export const UserStatusFormat: Record<UserStatus, string> = {
	ACTIVE: 'Active',
	INACTIVE: 'Inactive',
};
export const UserRoleFormat: Record<UserRole, string> = {
	ADMIN: 'Admin',
	USER: 'User',
};
export const fileSizeFormat = (bytes: number, decimals = 2) => {
	if (bytes === 0) return '0 Bytes';
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
export const createSlug = async (name: string) => {
	const slug = await slugify(name, {
		replacement: '-',
		lower: true,
		trim: true,
	});
	return slug;
};
