import { toast } from 'sonner';
import { FC } from 'react';
import { ShieldAlert, ShieldCheck, X } from 'lucide-react';
import Spinner from './spinner';
type CustomToastProps = {
	toastNumber: string | number;
	content: string;
};
export const ToastSuccess: FC<CustomToastProps> = ({
	toastNumber,
	content,
}) => {
	return (
		<div className="custom-toast bg-[#EBFBEE] border border-action-success border-opacity-30">
			<div className="flex items-center flex-1 gap-1.5">
				<ShieldCheck size={18} className="text-action-success" />
				<div className="flex-1 text-left">
					<p className="font-poppins text-[13px] font-normal">
						{content}
					</p>
				</div>
			</div>
			<button
				className="text-action-success"
				onClick={() => toast.dismiss(toastNumber)}
			>
				<X size={18} />
			</button>
		</div>
	);
};
export const ToastError: FC<CustomToastProps> = ({ toastNumber, content }) => {
	return (
		<div className="custom-toast bg-[#FFF5F5] border border-action-danger border-opacity-30">
			<div className="flex items-center flex-1 gap-1.5">
				<ShieldAlert size={18} className="text-action-danger" />
				<div className="flex-1 text-left">
					<p className="font-poppins text-[13px] font-normal">
						{content}
					</p>
				</div>
			</div>
			<button
				className="text-action-danger"
				onClick={() => toast.dismiss(toastNumber)}
			>
				<X size={18} />
			</button>
		</div>
	);
};
export const ToastLoading: FC<CustomToastProps> = ({ content }) => {
	return (
		<div className="custom-toast bg-white border border-primary-gray border-opacity-30">
			<div className="flex items-center flex-1 gap-1.5">
				<Spinner className="h-[20px] w-[20px] stroke-black-dark" />
				<div className="flex-1 text-left">
					<p className="font-poppins text-[14px] font-normal">
						{content}
					</p>
				</div>
			</div>
		</div>
	);
};
