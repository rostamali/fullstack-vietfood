'use client';
import Spinner from '@/components/elements/shared/spinner';
import { Button } from '@/components/ui/button';
import { useCreateOrder } from '@/lib/hooks/useOrder';
type BtnProps = {
	cartId: string;
};

const CheckoutBtn: React.FC<BtnProps> = ({ cartId }) => {
	const { mutate: createOrder, isPending } = useCreateOrder();
	const handleCreateOrder = () => {
		createOrder({
			cartId,
		});
	};
	return (
		<Button
			form="checkout-form"
			className="btn-primary-lg w-full"
			disabled={isPending}
			onClick={handleCreateOrder}
		>
			{isPending && (
				<Spinner className="h-[20px] w-[20px] stroke-white" />
			)}
			Confirm Order
		</Button>
	);
};

export default CheckoutBtn;
