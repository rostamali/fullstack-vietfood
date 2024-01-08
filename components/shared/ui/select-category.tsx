'use client';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { fetchCategoryList } from '@/lib/actions/category.action';
import { ChevronsUpDown } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
type CategoryProps = {
	trigger: string;
	placeholder: string;
	value: string | null;
	onChange: React.Dispatch<React.SetStateAction<string | null>>;
};

const SelectCategory: FC<CategoryProps> = ({
	trigger,
	placeholder,
	value,
	onChange,
}) => {
	const [data, setData] = useState<CategorySelectList[] | null>(null);
	useEffect(() => {
		const fetchCategory = async () => {
			const result = await fetchCategoryList();
			setData(result ? result.categories : null);
		};
		fetchCategory();
	}, []);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					className={`w-full ${trigger} justify-between focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-opacity-60`}
				>
					{value
						? data &&
						  data.find((framework) => framework.slug === value)
								?.name
						: placeholder}
					<ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="PopoverContent bg-white p-0">
				<Command>
					<CommandInput
						className="text-base-2 !text-[13px]"
						placeholder="Type a command or search..."
					/>
					<CommandEmpty className="text-base-2">
						No results found.
					</CommandEmpty>
					<CommandGroup className="max-h-[300px] overflow-y-auto scrollbar-sm">
						<CommandItem
							className="menubar-item"
							onSelect={() => onChange(null)}
							value="null"
						>
							<span>No Parent</span>
						</CommandItem>
						{data?.map((cat, index) => (
							<CommandItem
								className="menubar-item"
								key={index}
								onSelect={() => onChange(cat.slug)}
							>
								<span>{cat.name}</span>
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default SelectCategory;
