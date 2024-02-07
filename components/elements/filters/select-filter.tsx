'use client';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/helpers/search-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';
type SelectFilterProps = {
	filterKey: string;
	placeholder: string;
	triggerClass: string;
	contentClass: string;
	options: {
		label: string;
		value: string;
	}[];
};

const SelectFilter: FC<SelectFilterProps> = ({
	filterKey,
	placeholder,
	triggerClass,
	contentClass,
	options,
}) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const paramFilter = searchParams.get(filterKey);

	const handleFilterClick = (value: string) => {
		const newUrl = formUrlQuery({
			params: searchParams.toString(),
			key: filterKey,
			value: value.toLowerCase(),
		});
		router.push(newUrl, { scroll: false });
	};
	const handleFilterClear = () => {
		const newUrl = removeKeysFromQuery({
			params: searchParams.toString(),
			keysToRemove: [filterKey],
		});
		router.push(newUrl, { scroll: false });
	};
	return (
		<Select
			onValueChange={handleFilterClick}
			defaultValue={paramFilter || undefined}
		>
			<SelectTrigger
				className={`w-full rounded-md ${
					triggerClass.length > 0 ? triggerClass : ''
				}`}
			>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent
				className={`${
					contentClass.length > 0
						? contentClass
						: 'dark:bg-primary-dark-100 border-none text-white'
				}`}
			>
				<SelectGroup>
					{options.length > 0 ? (
						options.map((item, index) => (
							<SelectItem
								key={index}
								value={item.value}
								className="menubar-item"
							>
								{item.label}
							</SelectItem>
						))
					) : (
						<SelectLabel>No options found</SelectLabel>
					)}
					{options.length > 0 && (
						<SelectLabel
							className="menubar-item cursor-pointer font-medium"
							onClick={handleFilterClear}
						>
							Clear Filter
						</SelectLabel>
					)}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default SelectFilter;
