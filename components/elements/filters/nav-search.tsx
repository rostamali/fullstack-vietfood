import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const NavSearch = () => {
	return (
		<div className="rounded-md flex items-center focus-within:ring-2 focus-within:ring-offset-[3px] focus-within:ring-primary-green focus-within:ring-opacity-60 bg-gray-muted bg-opacity-40 px-2.5 border-light w-full">
			<Search className={`text-primary-gray text-opacity-40`} />
			<Input
				placeholder={'Search now...'}
				className={`text-primary-gray text-opacity-70 placeholder:text-primary-gray placeholder:text-opacity-50 bg-transparent border-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none h-[45px] min-w-[340px]`}
			/>
		</div>
	);
};

export default NavSearch;
