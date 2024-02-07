import { FC } from 'react';
import OTPInput from 'react-otp-input';
type OtpProps = {
	onChange: React.Dispatch<React.SetStateAction<string>>;
	fields: number;
	value: string;
};

const OtpField: FC<OtpProps> = ({ onChange, fields, value }) => {
	return (
		<OTPInput
			containerStyle="flex justify-between flex-wrap"
			inputType="number"
			value={value}
			onChange={(val) => onChange(val)}
			numInputs={fields}
			renderSeparator={<span className="mx-[4px]"></span>}
			renderInput={(props) => <input {...props} />}
			inputStyle="text-base-2 h-[45px] !w-[45px] max-xm:h-[35px] max-xm:!w-[35px] border border-primary-gray border-opacity-30 otp-input-field outline-none rounded-md focus:ring-2 focus:ring-offset-[2px] focus:ring-primary-green"
		/>
	);
};

export default OtpField;
