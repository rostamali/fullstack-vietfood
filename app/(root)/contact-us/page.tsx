import { QuickContact, SocialLinks } from '@/constants';
import ContactForm from './contact-form';
import Link from 'next/link';

const ContactUs = () => {
	return (
		<div className="contact-us py-[60px]">
			<div className="container">
				<div className="grid lg:grid-cols-2 gap-7">
					<div className="space-y-5">
						<div className="space-y-2">
							<h4 className="heading-4">Contact Us</h4>
							<p className="text-base-1">
								Thank you for visiting our online store! We
								value your feedback, inquiries, and suggestions.
								Please feel free to reach out to us using any of
								the following methods:
							</p>
						</div>
						<div className="space-y-4">
							{QuickContact.map((item, index) => (
								<div key={index} className="space-y-2">
									<h6 className="heading-6">
										<strong>{item.label}</strong>
									</h6>
									<span className="text-base-1 inline-block">
										{item.value}
									</span>
								</div>
							))}
						</div>
						<div className="space-y-2">
							<h4 className="heading-4">Follow Us</h4>
							<div className="flex items-center gap-1.5">
								{SocialLinks.map((item, index) => (
									<Link
										key={index}
										href={item.url}
										className="h-[35px] w-[35px] rounded-md border-light flex-center bg-primary-green bg-opacity-20 text-black-dark duration-150 hover:bg-primary-green hover:text-white"
									>
										<item.icon size={17} />
									</Link>
								))}
							</div>
						</div>
					</div>
					<div className="contact-formw-wrap">
						<div className="bg-white p-6 rounded-md">
							<h4 className="heading-4"></h4>
							<ContactForm />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactUs;
