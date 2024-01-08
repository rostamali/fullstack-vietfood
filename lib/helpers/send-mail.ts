import nodemailer, { Transporter } from 'nodemailer';

interface EmailOptions {
	email: string;
	subject: string;
	template: string;
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

	const { email, subject, template } = options;

	const mailOptions = {
		from: process.env.SMTP_MAIL,
		to: email,
		subject,
		html: template,
	};

	await transporter.sendMail(mailOptions);
};

export default sendMail;
