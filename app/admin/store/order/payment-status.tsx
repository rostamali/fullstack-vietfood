import { Badge } from '@/components/ui/badge';
import { FC } from 'react';
type StatusType = {
	status: PaymentStatus;
	className: string;
};
const PaymentStatus: FC<StatusType> = ({ status, className }) => {
	return (
		<div className="status-wrapper font-poppins">
			{status === 'PAID' && (
				<Badge
					className={`border-light bg-action-success text-gray-light flex-center py-1 ${className}`}
				>
					{status}
				</Badge>
			)}
			{status === 'UNPAID' && (
				<Badge
					className={`border-light bg-primary-gray bg-opacity-20 flex-center py-1 ${className}`}
				>
					{status}
				</Badge>
			)}
			{status === 'CANCELLED' && (
				<Badge
					className={`border-light bg-action-danger bg-opacity-20 flex-center py-1 ${className}`}
				>
					{status}
				</Badge>
			)}
		</div>
	);
};

export default PaymentStatus;
