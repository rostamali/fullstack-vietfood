import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { useState, FC } from 'react';
type FieldProps = {
	fieldClass: string;
	id: string;
	value: string | null;
	onChange: React.Dispatch<React.SetStateAction<string>>;
};

const PasswordField: FC<FieldProps> = ({ fieldClass, id, onChange, value }) => {
	const [showPass, setShowPass] = useState(false);
	return (
		<div className="relative w-full">
			<Input
				id={id}
				className={fieldClass}
				type={showPass ? 'text' : 'password'}
				onChange={(e) => onChange(e.target.value)}
				value={value ? value : ''}
			/>
			<Button
				className="absolute top-[50%] translate-y-[-50%] right-[10px] p-0 text-black-dark text-opacity-50"
				type="button"
				onClick={() => setShowPass(!showPass)}
			>
				{showPass ? <EyeOff size={20} /> : <Eye size={20} />}
			</Button>
		</div>
	);
};

export default PasswordField;
