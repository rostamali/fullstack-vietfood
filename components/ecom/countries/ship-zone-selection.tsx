'use client';
import * as React from 'react';
import { ChevronsUpDown } from 'lucide-react';
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
import { countryStateList } from '@/lib/actions/country.action';
import { Checkbox } from '@/components/ui/checkbox';
type SelectedType = {
	type: string;
	isoCode: string;
};

interface MultiSelectProps {
	selected: SelectedType[] | null;
	onChange: (val: SelectedType[] | null) => void;
	triggerClass: string;
}

const ShipZoneSelection = ({
	selected,
	onChange,
	triggerClass,
}: MultiSelectProps) => {
	const result = countryStateList();
	const toggleSelection = (
		selectedArray: SelectedType[] | null,
		newItem: SelectedType,
	) => {
		if (selectedArray) {
			const itemIndex = selectedArray.findIndex(
				(item) =>
					item.isoCode === newItem.isoCode &&
					item.type === newItem.type,
			);
			if (itemIndex !== -1) {
				// Item already selected, remove it
				return [
					...selectedArray.slice(0, itemIndex),
					...selectedArray.slice(itemIndex + 1),
				];
			} else {
				// Item not selected, add it
				return [...selectedArray, newItem];
			}
		} else {
			return null;
		}
	};
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					className={`w-full justify-between focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-opacity-60 ${triggerClass}`}
				>
					Select
					<ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="PopoverContent bg-white p-0">
				<Command>
					<CommandInput placeholder="Search ..." />
					<CommandEmpty>No item found.</CommandEmpty>
					<CommandGroup className="max-h-[300px] overflow-y-auto scrollbar-sm">
						{result.map((country, countryIndex) => (
							<div key={countryIndex}>
								{/* Render country */}
								<CommandItem
									key={country.isoCode}
									onSelect={() => {
										onChange(
											toggleSelection(selected || [], {
												type: 'COUNTRY',
												isoCode: country.isoCode,
											}),
										);
									}}
									className="menubar-item"
								>
									<Checkbox
										checked={
											selected
												? selected.some(
														(item) =>
															item.isoCode ===
																country.isoCode &&
															item.type ===
																'COUNTRY',
												  )
												: false
										}
										className="checkbox-sm"
									/>
									<span className="pl-2 font-medium">
										{country.name}
									</span>
								</CommandItem>

								{/* Render states for the country */}
								{country.states.map((state, stateIndex) => (
									<CommandItem
										key={stateIndex}
										onSelect={() => {
											onChange(
												toggleSelection(
													selected || [],
													{
														type: 'STATE',
														isoCode: state.isoCode,
													},
												),
											);
										}}
										className="menubar-item ml-4"
									>
										<Checkbox
											checked={
												selected
													? selected.some(
															(item) =>
																item.isoCode ===
																	state.isoCode &&
																item.type ===
																	'STATE',
													  )
													: false
											}
											className="checkbox-sm"
										/>
										<span className="pl-2">
											{state.name}
										</span>
									</CommandItem>
								))}
							</div>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default ShipZoneSelection;
