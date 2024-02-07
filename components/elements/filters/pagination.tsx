'use client';
import { Button } from '@/components/ui/button';
import { FC } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery } from '@/lib/helpers/search-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
	pages: number;
	containerClass: string;
	prevBtnClass: string;
	nextBtnClass: string;
	paginateBtnClass: string;
	paginateActiveClass: string;
};

const Pagination: FC<PaginationProps> = ({
	pages,
	containerClass,
	prevBtnClass,
	nextBtnClass,
	paginateBtnClass,
	paginateActiveClass,
}) => {
	const showPages = 3;
	const searchParams = useSearchParams();
	const router = useRouter();
	const paramFilter = searchParams.get('page') || 1;

	const startPage = Math.max(
		1,
		parseInt(paramFilter as string) - Math.floor(showPages / 2),
	);
	const endPage = Math.min(pages, startPage + showPages - 1);

	const renderPages = Array.from(
		{ length: endPage - startPage + 1 },
		(_, i) => startPage + i,
	);

	const handlePaginationClick = (value: string) => {
		const newUrl = formUrlQuery({
			params: searchParams.toString(),
			key: 'page',
			value: value.toLowerCase(),
		});
		router.push(newUrl, { scroll: false });
	};

	return (
		<nav className={`flex items-center ${containerClass}`}>
			<ul className="flex items-center gap-[5px]">
				<li>
					<Button
						className={`${prevBtnClass} hover:bg-black-dark hover:bg-opacity-5 pl-2 text-base-1 font-medium`}
						disabled={parseInt(paramFilter as string) === 1}
						onClick={() =>
							handlePaginationClick(
								(
									parseInt(paramFilter as string) - 1
								).toString(),
							)
						}
					>
						<ChevronLeft strokeWidth={2} className="h-[20px]" />
						<span className="max-xm:hidden">Previous</span>
					</Button>
				</li>
				{renderPages.map((page) => (
					<li key={page}>
						<Button
							onClick={() =>
								handlePaginationClick(page.toString())
							}
							className={`h-[40px] w-[40px] hover:bg-black-dark hover:bg-opacity-10 text-base-2 ${paginateBtnClass} ${
								page === parseInt(paramFilter as string)
									? paginateActiveClass
									: ''
							}`}
							disabled={parseInt(paramFilter as string) === page}
						>
							{page}
						</Button>
					</li>
				))}
				<li>
					<Button
						disabled={parseInt(paramFilter as string) === pages}
						onClick={() =>
							handlePaginationClick(
								(
									parseInt(paramFilter as string) + 1
								).toString(),
							)
						}
						className={`${nextBtnClass} hover:bg-black-dark hover:bg-opacity-5 pr-2 text-base-1 font-medium`}
					>
						<span className="max-xm:hidden">Next</span>
						<ChevronRight strokeWidth={2} className="h-[20px]" />
					</Button>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
