import { FC } from 'react';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
type FieldProps = {
	triggerClass: string;
	placeholder: string;
	defaultValue: string;
	onChange: (val: string) => void;
	options: {
		label: string;
		value: string;
	}[];
};

const SelectField: FC<FieldProps> = ({
	triggerClass,
	placeholder,
	defaultValue,
	onChange,
	options,
}) => {
	return (
		<Select
			onValueChange={onChange}
			defaultValue={defaultValue}
			value={defaultValue}
		>
			<SelectTrigger className={triggerClass}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent className="bg-white">
				<SelectGroup>
					{options.map((option, index) => (
						<SelectItem
							key={index}
							className="menubar-item"
							value={option.value}
						>
							{option.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default SelectField;
