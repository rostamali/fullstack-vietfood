'use client';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { Heart } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
const addToCartShema = z.object({
	quantity: z.coerce
		.string({
			invalid_type_error: 'Quantity must be a number',
		})
		.refine((value) => value !== undefined && value !== null, {
			message: 'Quantity is required',
		})
		.transform((value) => Number(value)),
});

const AddToCart = () => {
	const form = useForm<z.infer<typeof addToCartShema>>({
		resolver: zodResolver(addToCartShema),
		defaultValues: {
			quantity: 1,
		},
	});
	const handleAddToCart = (data: z.infer<typeof addToCartShema>) => {};

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
					<Button className="btn-primary-sm">
						<Heart size={20} strokeWidth={2.5} />
					</Button>
				</div>
				<div className="flex items-center gap-4">
					<Button className="btn-primary-sm xm:w-[150px] w-full">
						Add to Cart
					</Button>
					<Button
						type="button"
						className="btn-ghost-sm w-[150px] max-xm:hidden"
					>
						Buy Now
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default AddToCart;
