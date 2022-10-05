import type { RequestHandler } from './$types';
import nodemailer from 'nodemailer';
import { CAPTCHA_SECRET_KEY, EMAIL_RECEIVER, MAIL_PASS, MAIL_USER } from '$env/static/private';

const transporter = nodemailer.createTransport({
	host: 'smtp.ionos.de',
	port: 25,
	secure: false,
	requireTLS: false,
	auth: {
		user: MAIL_USER,
		pass: MAIL_PASS
	}
});

async function send_mail(content: string[]) {
	await transporter.sendMail({
		from: 'mailserver@varzi-realty.com', // sender address
		to: EMAIL_RECEIVER,
		subject: 'Website Contact', // Subject line
		text: content.join('\n'), // plain text body
		html: '' // html body
	});
}

async function verify_token(token: string) {
	if (token == undefined || token == null || token.length == 0) return false;

	const url = `https://www.google.com/recaptcha/api/siteverify?secret=${CAPTCHA_SECRET_KEY}&response=${token}`;

	const result = await fetch(url, {
		method: 'post'
	});

	const response = await result.json();

	if (response && response.success == true && response.score >= 0.2) {
		return true;
	}

	return false;
}

export const POST: RequestHandler = async (event) => {
	const data = await event.request.formData();

	const content: { [entry: string]: string } = {};
	const mail_content: string[] = [];
	for (var pair of data.entries() as IterableIterator<[string, string]>) {
		mail_content.push(pair[0] + ': ' + pair[1]);
		content[pair[0]] = pair[1];
	}
	const result = await verify_token(content['token']);

	if (result) {
		await send_mail(mail_content);
	}

	return new Response(null, { status: 302, headers: { Location: '/' } });
};
