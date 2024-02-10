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
import { Check, ChevronsUpDown } from 'lucide-react';
import { FC } from 'react';
import { fetchCountryList } from '@/lib/actions/country.action';
import Image from 'next/image';

type SelectProps = {
	trigger: string;
	placeholder: string;
	value: string | null;
	onChange: React.Dispatch<React.SetStateAction<string | null>>;
};

const CountryField: FC<SelectProps> = ({
	trigger,
	placeholder,
	value,
	onChange,
}) => {
	const data = fetchCountryList();
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					className={`w-full ${trigger} justify-between focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-opacity-60`}
				>
					<span>
						{value && data
							? data.find((item) => item.isoCode === value)?.name
							: placeholder}
					</span>
					<ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="PopoverContent bg-white p-0">
				<Command>
					<CommandInput
						className="text-base-2 !text-[13px]"
						placeholder="Type here..."
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
									className="menubar-item flex items-center justify-between gap-2"
									key={index}
									onSelect={() => onChange(item.isoCode)}
								>
									<div className="flex items-center gap-1.5">
										<Image
											src={item.flag}
											alt={item.name}
											height={100}
											width={100}
											className="w-[25px] h-[18px] object-cover rounded-[2px] border-light"
										/>
										<span>{item.name}</span>
									</div>
									<Check
										size={20}
										className={`${
											item.isoCode === value
												? 'opacity-100'
												: 'opacity-0'
										}`}
									/>
								</CommandItem>
							))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default CountryField;
