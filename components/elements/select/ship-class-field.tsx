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
import { Skeleton } from '@/components/ui/skeleton';
import { useShipClassList } from '@/lib/hooks/useShip';
type Selected = {
	id: string;
	name: string;
};
type CategoryProps = {
	trigger: string;
	placeholder: string;
	value: Selected | null;
	onChange: React.Dispatch<React.SetStateAction<Selected | null>>;
};

const ShipClassField: FC<CategoryProps> = ({
	trigger,
	placeholder,
	value,
	onChange,
}) => {
	const { data, isLoading } = useShipClassList();

	return (
		<Popover>
			<PopoverTrigger asChild>
				{isLoading ? (
					<Skeleton className="h-[45px] w-full rounded-md bg-white" />
				) : (
					<Button
						className={`w-full ${trigger} justify-between focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-opacity-60`}
					>
						<span>
							{value
								? data &&
								  data.find((cat) => cat.id === value.id)?.name
								: placeholder}
						</span>
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
						<CommandItem
							className="menubar-item"
							onSelect={() => onChange(null)}
							value="null"
						>
							<span>Select None</span>
						</CommandItem>
						{data &&
							data?.map((item, index) => (
								<CommandItem
									className="menubar-item"
									key={index}
									onSelect={() =>
										onChange({
											id: item.id,
											name: item.name,
										})
									}
								>
									<span>{item.name}</span>
								</CommandItem>
							))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default ShipClassField;
