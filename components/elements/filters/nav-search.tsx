'use client';
import { Input } from '@/components/ui/input';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/helpers/search-query';
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import NavSearchResult from './nav-search-result';

const NavSearch = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const globalQuery = searchParams.get('global');
	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState(globalQuery || '');
	const searchContainer = useRef(null);

	useEffect(() => {
		const handleOutsideClick = (event: any) => {
			if (
				searchContainer.current &&
				// @ts-ignore
				!searchContainer.current.contains(event.target)
			) {
				setIsOpen(false);
				setSearch('');
			}
		};

		document.addEventListener('click', handleOutsideClick);

		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, [pathname]);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (search) {
				const newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: 'global',
					value: search,
				});
				router.push(newUrl, { scroll: false });
			} else {
				if (globalQuery) {
					const newUrl = removeKeysFromQuery({
						params: searchParams.toString(),
						keysToRemove: ['global'],
					});
					router.push(newUrl, { scroll: false });
				}
			}
		}, 300);
		return () => clearTimeout(delayDebounceFn);
	}, [search, pathname, router, searchParams, globalQuery]);

	return (
		<div className="relative font-poppins" ref={searchContainer}>
			<div className="rounded-md flex items-center focus-within:ring-2 focus-within:ring-offset-[3px] focus-within:ring-primary-green focus-within:ring-opacity-60 bg-gray-muted bg-opacity-40 px-2.5 border-light w-full">
				<Search className={`text-primary-gray text-opacity-40`} />
				<Input
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);

						if (!isOpen) setIsOpen(true);
						if (e.target.value === '' && isOpen) setIsOpen(false);
					}}
					placeholder={'Search now...'}
					className={`text-primary-gray text-opacity-70 placeholder:text-primary-gray placeholder:text-opacity-50 bg-transparent border-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none h-[45px] min-w-[340px]`}
				/>
			</div>
			{isOpen && <NavSearchResult />}
		</div>
	);
};

export default NavSearch;
