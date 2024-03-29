import nodemailer, { Transporter } from 'nodemailer';
import ejs from 'ejs';
import { join } from 'path';

interface EmailOptions {
	email: string;
	subject: string;
	template: string;
	data: { [key: string]: any };
}

const sendMail = async (options: EmailOptions): Promise<void> => {
	const transporter: Transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: parseInt(process.env.SMTP_PORT || '587'),
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS,
		},
	});

	const { email, subject, template, data } = options;
	const templatePath = join('./lib/email-templates', template);
	const html: string = await ejs.renderFile(templatePath, data);

	const mailOptions = {
		from: process.env.SMTP_MAIL,
		to: email,
		subject,
		html: html,
	};

	await transporter.sendMail(mailOptions);
};

export default sendMail;
