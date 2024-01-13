import { Button } from '@/components/ui/button';
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
import { ChevronsUpDown } from 'lucide-react';
import { FC } from 'react';
import { useBrandList } from '@/lib/hooks/useBrand';
import { Skeleton } from '@/components/ui/skeleton';
type Selected = {
	id: string;
	slug: string;
};
type BrandProps = {
	trigger: string;
	placeholder: string;
	value: Selected | null;
	onChange: React.Dispatch<React.SetStateAction<Selected | null>>;
};

const SelectBrand: FC<BrandProps> = ({
	trigger,
	placeholder,
	value,
	onChange,
}) => {
	const { data, isLoading } = useBrandList();

	return (
		<Popover>
			<PopoverTrigger asChild>
				{isLoading ? (
					<Skeleton className="h-[45px] w-full rounded-md bg-white" />
				) : (
					<Button
						className={`w-full ${trigger} justify-between focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-opacity-60`}
					>
						{value
							? data &&
							  data.brands.find(
									(brand) => brand.slug === value.slug,
							  )?.name
							: placeholder}
						<ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
					</Button>
				)}
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
						{isLoading || !data ? (
							<CommandItem
								className="menubar-item"
								onSelect={() => onChange(null)}
								value="null"
							>
								<span>No Item</span>
							</CommandItem>
						) : (
							data.brands?.map((brand, index) => (
								<CommandItem
									className="menubar-item"
									key={index}
									onSelect={() =>
										onChange({
											id: brand.id,
											slug: brand.slug,
										})
									}
								>
									<span>{brand.name}</span>
								</CommandItem>
							))
						)}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default SelectBrand;
