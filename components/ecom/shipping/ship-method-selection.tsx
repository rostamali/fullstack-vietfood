import * as React from 'react';
import { cn } from '@/lib/utils';

import { Check, X, ChevronsUpDown } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { fetchMethodListByAdmin } from '@/lib/actions/ship.action';

interface MultiSelectProps {
	selected: ZoneMethods[];
	onChange: React.Dispatch<React.SetStateAction<ZoneMethods[]>>;
	className?: string;
}

const ShipMethodSelection = ({
	selected,
	onChange,
	className,
	...props
}: MultiSelectProps) => {
	const [open, setOpen] = React.useState(false);
	const [options, setOptions] = React.useState<ZoneMethods[] | null>(null);
	React.useEffect(() => {
		const fetchMethods = async () => {
			const result = await fetchMethodListByAdmin();
			setOptions(result ? result : null);
		};
		fetchMethods();
	}, []);
	const handleUnselect = (item: string) => {
		onChange(selected.filter((i) => i.id !== item));
	};
	const isSelected = (option: ZoneMethods) => {
		const isOptionInSelected =
			selected !== null &&
			Array.isArray(selected) &&
			selected.some((item) => item.id === option.id);
		return isOptionInSelected;
	};

	return (
		<Popover open={open} onOpenChange={setOpen} {...props}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={`w-full justify-between ${className}`}
					onClick={() => setOpen(!open)}
				>
					<div className="flex gap-1 flex-wrap text-base-2">
						Select methods...
					</div>

					<ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="PopoverContent bg-white p-0">
				<Command>
					<CommandInput placeholder="Search ..." />
					<CommandEmpty>No item found.</CommandEmpty>
					<CommandGroup className="max-h-64 overflow-auto">
						{options &&
							options.map((option, index) => (
								<CommandItem
									key={index}
									className="menubar-item"
									onSelect={() => {
										// onChange(
										// 	selected !== null
										// 		? selected.includes(option)
										// 			? selected.filter(
										// 					(item) =>
										// 						item.id !==
										// 						option.id,
										// 			  )
										// 			: [...selected, option]
										// 		: [option],
										// );

										onChange(
											isSelected(option)
												? selected.filter(
														(item) =>
															item.id !==
															option.id,
												  )
												: [...selected, option],
										);
										setOpen(true);
									}}
								>
									<Check
										size={18}
										className={`text-primary-green mr-1 ${
											isSelected(option)
												? 'opacity-100'
												: 'opacity-0'
										}`}
									/>
									{option.name}
								</CommandItem>
							))}
					</CommandGroup>
				</Command>
			</PopoverContent>
			{selected &&
				selected.map((item, index) => (
					<Badge
						key={index}
						className="bg-gray-muted font-poppins"
						onClick={() => handleUnselect(item.id)}
					>
						<span className="font-normal">{item.name}</span>
						<div
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleUnselect(item.id);
								}
							}}
							onMouseDown={(e) => {
								e.preventDefault();
								e.stopPropagation();
							}}
							onClick={() => handleUnselect(item.id)}
						>
							<X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
						</div>
					</Badge>
				))}
		</Popover>
	);
};

export default ShipMethodSelection;
