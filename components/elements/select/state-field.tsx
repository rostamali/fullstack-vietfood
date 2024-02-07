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
import { useStateByCountry } from '@/lib/hooks/useCountry';
type StateProps = {
	trigger: string;
	placeholder: string;
	value: string | null;
	countryCode: string | null;
	onChange: React.Dispatch<React.SetStateAction<string | null>>;
};

const StateField: FC<StateProps> = ({
	trigger,
	placeholder,
	value,
	onChange,
	countryCode,
}) => {
	const { data } = useStateByCountry(countryCode);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					className={`w-full ${trigger} justify-between focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-opacity-60`}
				>
					<span>
						{value && data
							? data.find((item) => item.isoCode === value)
									?.isoCode
							: placeholder}
					</span>
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
							<span>Select None</span>
						</CommandItem>
						{data &&
							data?.map((item, index) => (
								<CommandItem
									className="menubar-item"
									key={index}
									onSelect={() => onChange(item.isoCode)}
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

export default StateField;
