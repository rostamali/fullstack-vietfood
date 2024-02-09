import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QuickContact, SocialLinks, UsefullLinks } from '@/constants';
import Link from 'next/link';
import React from 'react';

const RootFooter = () => {
	return (
		<footer id="site-footer">
			<div className="container py-[60px]">
				<div className="grid xl:grid-cols-[350px,1fr,1fr,280px] grid-cols-4 max-lg:grid-cols-2 max-xm:grid-cols-1 gap-[25px]">
					<div className="footer-col-gap">
						<h4 className="heading-4">Newsletter Signup</h4>
						<div>
							<span className="text-base-2">
								Don't miss any promotion, get additional
								discounts.
							</span>
							<div className="flex items-center gap-3">
								<Input className="input-field-sm" />
							</div>
						</div>
						<div className="social-media">
							<h5 className="heading-5">Follow us</h5>
							<div className="flex items-center gap-2 mt-2">
								{SocialLinks.map((link, index) => (
									<Link
										key={index}
										href={link.url}
										target="_blank"
										className="h-[35px] w-[35px] rounded-full border-light flex-center bg-primary-green bg-opacity-20 text-black-dark duration-150 hover:bg-primary-green hover:text-white"
									>
										<link.icon
											size={17}
											strokeWidth={2.5}
										/>
									</Link>
								))}
							</div>
						</div>
					</div>
					<div className="footer-col-gap lg:pl-10">
						<h4 className="heading-4">Usefull Links</h4>
						<ul className="flex flex-col gap-2">
							{UsefullLinks.map((link, index) => (
								<li key={index}>
									<Link
										href={link.url}
										className="text-base-1"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="footer-col-gap">
						<h4 className="heading-4">Usefull Links</h4>
						<ul className="flex flex-col gap-2">
							{UsefullLinks.map((link, index) => (
								<li key={index}>
									<Link
										href={link.url}
										className="text-base-1"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="footer-col-gap">
						<h4 className="heading-4">Quick Contacts</h4>
						<ul className="flex flex-col gap-4">
							{QuickContact.map((item, index) => (
								<li
									key={index}
									className="flex items-center gap-2"
								>
									<div className="h-[42px] w-[42px] rounded-full bg-primary-green bg-opacity-40 flex-center text-black-dark">
										<item.icon
											size={17}
											strokeWidth={2.5}
										/>
									</div>
									<span className="text-base-1 flex-1">
										{item.value}
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
			<div className="border-t border-primary-gray border-opacity-15 py-[30px]">
				<div className="container">
					<div className="flex-center text-base-2">
						Copyright 2024 Vietfood, All Rights Reserved.
					</div>
				</div>
			</div>
		</footer>
	);
};

export default RootFooter;
