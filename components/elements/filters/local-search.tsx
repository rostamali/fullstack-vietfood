'use client';
import { Input } from '@/components/ui/input';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/helpers/search-query';
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
type LocalSearchProps = {
	route: string;
	iconPosition: 'left' | 'right';
	placeholder: string;
	containerClass: string;
	inputClass: string;
	iconClass: string;
};

const LocalSearch: React.FC<LocalSearchProps> = ({
	route,
	iconPosition,
	placeholder,
	containerClass,
	inputClass,
	iconClass,
}) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const query = searchParams.get('q');
	const [search, setSearch] = useState(query || '');

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (search) {
				const newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: 'q',
					value: search,
				});
				router.push(newUrl, { scroll: false });
			} else {
				if (pathname === route) {
					const newUrl = removeKeysFromQuery({
						params: searchParams.toString(),
						keysToRemove: ['q'],
					});
					router.push(newUrl, { scroll: false });
				}
			}
		}, 300);
		return () => clearTimeout(delayDebounceFn);
	}, [search, pathname, router, searchParams, query]);
	return (
		<div
			className={`font-poppins rounded-md flex items-center focus-within:ring-2 focus-within:ring-offset-[3px] focus-within:ring-primary-green focus-within:ring-opacity-60 ${
				containerClass.length > 0 ? containerClass : 'border'
			} ${
				iconPosition === 'left'
					? 'flex-row pl-[12px]'
					: 'flex-row-reverse pr-[12px]'
			}`}
		>
			<Search
				className={`text-primary-gray text-opacity-40 ${iconClass}`}
			/>
			<Input
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder={placeholder.length ? placeholder : 'Search now...'}
				className={`text-primary-gray text-opacity-70 placeholder:text-primary-gray placeholder:text-opacity-50 bg-transparent border-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none ${inputClass}`}
			/>
		</div>
	);
};

export default LocalSearch;
