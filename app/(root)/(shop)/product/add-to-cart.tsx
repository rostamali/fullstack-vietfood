'use client';
import Spinner from '@/components/elements/shared/spinner';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { addToCartShema } from '@/lib/helpers/form-validation';
import { useAddToCart } from '@/lib/hooks/useOrder';
import { useAddToWishlist } from '@/lib/hooks/useShop';
import { zodResolver } from '@hookform/resolvers/zod';
import { Heart } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
type FormProps = {
	productId: string;
};

const AddToCart: React.FC<FormProps> = ({ productId }) => {
	const { mutate: addToCart, isPending } = useAddToCart();
	const { mutate: addToWishlist, isPending: isAdding } = useAddToWishlist();
	const form = useForm<z.infer<typeof addToCartShema>>({
		resolver: zodResolver(addToCartShema),
		defaultValues: {
			quantity: 1,
		},
	});
	const handleAddToCart = (data: z.infer<typeof addToCartShema>) => {
		addToCart({
			quantity: data.quantity,
			productId: productId,
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleAddToCart)}
				className="space-y-4 w-full"
			>
				<div className="flex items-center gap-4">
					<FormField
						control={form.control}
						name="quantity"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={`${field.value}`}
									>
										<SelectTrigger className="input-field-sm bg-white w-[150px]">
											<div className="flex items-center gap-3 text-base-2">
												<span className="font-medium">
													Quantity:
												</span>
												<SelectValue />
											</div>
										</SelectTrigger>
										<SelectContent className="bg-white">
											{[1, 2, 3, 4, 5, 6].map((item) => (
												<SelectItem
													value={item.toString()}
													key={item}
												>
													{item}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						className="btn-primary-sm"
						type="button"
						onClick={() => {
							addToWishlist({
								productId,
							});
						}}
						disabled={isAdding}
					>
						{isAdding ? (
							<Spinner className="h-[20px] w-[20px] stroke-white" />
						) : (
							<Heart size={20} strokeWidth={2.5} />
						)}
					</Button>
				</div>
				<div className="flex items-center gap-4">
					<Button
						className="btn-primary-sm xm:w-[218px] w-full gap-1"
						disabled={isPending}
					>
						{isPending && (
							<Spinner className="h-[20px] w-[20px] stroke-white" />
						)}
						Add to Cart
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default AddToCart;
