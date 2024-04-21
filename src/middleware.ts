import { NextRequest, NextResponse } from 'next/server';
import { isValidPassword } from './lib/isValidPassword';

const isAuthenticated = async (req: NextRequest): Promise<boolean> => {
	const authHeader =
		req.headers.get('authorization') || req.headers.get('Authorization');

	if (!authHeader) return false;

	const [username, password] = Buffer.from(authHeader.split(' ')[1], 'base64')
		.toString()
		.split(':');

	return (
		username === process.env.ADMIN_USERNAME &&
		(await isValidPassword(
			password,
			process.env.ADMIN_HASHED_PASSWORD as string
		))
	);
};

export const middleware = async (req: NextRequest) => {
	if (!(await isAuthenticated(req))) {
		return new NextResponse('Unauthorized', {
			status: 401,
			headers: { 'WWW-Authenticate': 'Basic' },
		});
	}
};

export const config = {
	matcher: '/admin/:path*',
};
