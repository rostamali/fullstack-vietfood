import { toast } from 'sonner';
import { FC } from 'react';
import { AlertOctagon, BadgeCheck, X } from 'lucide-react';
type CustomToastProps = {
	toastNumber: string | number;
	content: string;
};
export const ToastSuccess: FC<CustomToastProps> = ({
	toastNumber,
	content,
}) => {
	return (
		<div className="toast-success">
			<BadgeCheck size={25} />
			<div className="flex-1 text-left">
				<p className="font-poppins text-[14px] font-normal">
					{content}
				</p>
			</div>
			<button
				className="toast-success-dismiss"
				onClick={() => toast.dismiss(toastNumber)}
			>
				<X size={12} />
			</button>
		</div>
	);
};
export const ToastError: FC<CustomToastProps> = ({ toastNumber, content }) => {
	return (
		<div className="toast-error">
			<AlertOctagon size={25} />
			<div className="flex-1 text-left">
				<p className="font-poppins text-[14px] font-normal">
					{content}
				</p>
			</div>
			<button
				className="toast-error-dismiss"
				onClick={() => toast.dismiss(toastNumber)}
			>
				<X size={12} />
			</button>
		</div>
	);
};
