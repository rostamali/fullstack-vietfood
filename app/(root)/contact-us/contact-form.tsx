'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ContactFormSchema } from '@/lib/helpers/form-validation';
import { Textarea } from '@/components/ui/textarea';
import { useSubmitContactForm } from '@/lib/hooks/useShop';
import Spinner from '@/components/elements/shared/spinner';
const ContactForm = () => {
	const { mutate: submitForm, isPending } = useSubmitContactForm();

	const form = useForm<z.infer<typeof ContactFormSchema>>({
		resolver: zodResolver(ContactFormSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: '',
			message: '',
		},
	});
	const handleContactForm = (values: z.infer<typeof ContactFormSchema>) => {
		submitForm(values, {
			onSuccess: () => {
				form.reset();
			},
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleContactForm)}
				className="space-y-6"
			>
				<div className="grid xm:grid-cols-2 grid-cols-1 gap-6">
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									Firstname
								</FormLabel>
								<FormControl>
									<Input
										className="input-field-lg"
										{...field}
										placeholder="Your Full Name"
									/>
								</FormControl>
								<FormMessage className="form-error" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									Lastname
								</FormLabel>
								<FormControl>
									<Input
										className="input-field-lg"
										{...field}
										placeholder="Your Full Name"
									/>
								</FormControl>
								<FormMessage className="form-error" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									E-mail Address
								</FormLabel>
								<FormControl>
									<Input
										className="input-field-lg"
										{...field}
										placeholder="E-mail Address"
									/>
								</FormControl>
								<FormMessage className="form-error" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phoneNumber"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="field-label-sm">
									Phone number
								</FormLabel>
								<FormControl>
									<Input
										className="input-field-lg"
										{...field}
										placeholder="Enter Subject"
									/>
								</FormControl>
								<FormMessage className="form-error" />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="field-label-sm">
								Message
							</FormLabel>
							<FormControl>
								<Textarea
									className="input-field-lg"
									{...field}
									placeholder="Type your message here..."
								/>
							</FormControl>
							<FormMessage className="form-error" />
						</FormItem>
					)}
				/>
				<Button className="btn-primary-lg">
					{isPending ? (
						<div className="flex items-center gap-1">
							<Spinner className="h-[20px] w-[20px] stroke-white" />
							Sending...
						</div>
					) : (
						'Send Message'
					)}
				</Button>
			</form>
		</Form>
	);
};

export default ContactForm;
