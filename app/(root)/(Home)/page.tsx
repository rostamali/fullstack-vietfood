'use client';
import EmptyIcon from '@/components/shared/ui/empty-icon';
import { useLoadModalFiles } from '@/lib/hooks/useInfinity';

export default function Home() {
	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status,
	} = useLoadModalFiles();

	return (
		<div className="min-h-screen flex flex-col p-20 gap-[30px]">
			<div className="container">
				<div className="grid grid-cols-4 gap-[15px]">
					{data?.pages.map((page) =>
						page.map((pokemon, index) => (
							<div className="text-base-2" key={index}>
								{/* {pokemon.name} */}
								{pokemon.title}
							</div>
						)),
					)}
				</div>
				<button
					className="rounded-full mt-3 border-2 border-blue-400 py-1 px-8 bg-yellow-300 cursor-pointer shadow-lg"
					onClick={() => fetchNextPage()}
				>
					{isFetchingNextPage
						? 'Loading more...'
						: hasNextPage
						? 'Load More'
						: 'Nothing more to load'}
				</button>
			</div>
		</div>
	);
}
