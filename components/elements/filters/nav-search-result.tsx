'use client';
import { useGlobalProductSearch } from '@/lib/hooks/useShop';
import { Bookmark, Database, RotateCw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const NavSearchResult = () => {
	const searchParams = useSearchParams();
	const globalQuery = searchParams.get('global');
	const { data, isLoading, isFetching } = useGlobalProductSearch(globalQuery);

	return (
		<div className="absolute w-full top-[100%] mt-2 left-0 right-0 bg-white rounded-md border-light z-10 shadow-sm max-h-[300px] overflow-y-auto scrollbar-sm">
			{isLoading || isFetching ? (
				<div className="result-loading p-4 flex-center">
					<div className="flex flex-col items-center gap-2">
						<RotateCw
							className="animate-spin text-action-success"
							size={24}
						/>
						<p className="text-base-1">Loading Products</p>
					</div>
				</div>
			) : (
				<div className="result p-2">
					{data && data.products && data.products.length > 0 ? (
						<div className="space-y-2">
							{data.products.map((item, index) => (
								<Link
									className="block bg-transparent hover:bg-gray-muted px-2.5 py-2.5 rounded-md"
									key={index}
									href={`/product/${item.slug}`}
								>
									<div className="flex gap-2 items-center">
										<div
											className={`h-[45px] w-[45px] rounded-md border-light flex-center ${
												item.thumbnail
													? `bg-transparent`
													: 'bg-[#EFF1F3]'
											}`}
										>
											<Image
												src={
													item.thumbnail
														? `/uploads/files/${item.thumbnail}`
														: `/assets/placeholder.svg`
												}
												width={400}
												height={400}
												alt={item.name}
												className="w-[90%] object-contain"
												style={{
													aspectRatio: '3/2',
												}}
											/>
										</div>
										<div className="space-y-[2px]">
											<p className="text-base-1 !text-black-dark">
												{item.name.substring(0, 30)}
											</p>
											<p className="text-[13px] font-medium font-poppins text-primary-gray text-opacity-50">
												{item.category}
											</p>
										</div>
									</div>
								</Link>
							))}
						</div>
					) : (
						<div className="flex-center py-2">
							<div className="flex flex-col items-center gap-2">
								<Database
									className="text-action-danger"
									size={24}
								/>
								<p className="text-base-1">No product found</p>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default NavSearchResult;
