'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForgotPassword } from '@/lib/hooks/useAuth';
import { ForgotPasswordSchema } from '@/lib/helpers/form-validation';
import Spinner from '@/components/elements/shared/spinner';

const ForgotForm = () => {
	const { mutate: forgotPassword, isPending } = useForgotPassword();
	const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
		resolver: zodResolver(ForgotPasswordSchema),
		defaultValues: {
			email: '',
		},
	});
	const handleForgotPassword = async (
		data: z.infer<typeof ForgotPasswordSchema>,
	) => {
		forgotPassword(data, {
			onSuccess: () => {
				form.reset();
			},
		});
	};

	return (
		<Form {...form}>
			<form
				className="space-y-7"
				onSubmit={form.handleSubmit(handleForgotPassword)}
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-sm">
								Email address
							</FormLabel>
							<FormControl>
								<Input
									type="email"
									className="input-field-sm"
									{...field}
								/>
							</FormControl>
							<FormMessage className="form__error" />
						</FormItem>
					)}
				/>

				<Button
					className="btn-primary-sm gap-1 w-full"
					disabled={isPending}
				>
					<>
						{isPending && (
							<Spinner
								className={'h-[20px] w-[20px] stroke-white'}
							/>
						)}
						Continue
					</>
				</Button>
			</form>
		</Form>
	);
};

export default ForgotForm;
