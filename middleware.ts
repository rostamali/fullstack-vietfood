import { NextRequest, NextResponse } from 'next/server';
import { isAuthEdge } from './lib/helpers/jwt-token';

export async function middleware(req: NextRequest) {
	const response = NextResponse.next();

	// Authentication token
	const refreshToken = req.cookies.get('vietfood_refresh_token')?.value;
	const accessToken = req.cookies.get('vietfood_access_token')?.value;

	// admin dashboard access
	const authenticated = await isAuthEdge({
		accessToken: accessToken ? accessToken : null,
		refreshToken: refreshToken ? refreshToken : null,
	});
	if (req.nextUrl.pathname.startsWith('/admin')) {
		if (!authenticated) {
			response.cookies.delete('vietfood_refresh_token');
			response.cookies.delete('vietfood_access_token');
			return NextResponse.redirect(
				new URL(
					`/auth/login?redirect=${req.nextUrl.pathname}`,
					req.url,
				),
			);
		} else if (authenticated.role === 'ADMIN') {
			return;
		} else if (authenticated.role === 'USER') {
			return NextResponse.redirect(new URL(`/permission-error`, req.url));
		} else {
			response.cookies.delete('vietfood_refresh_token');
			response.cookies.delete('vietfood_access_token');
			return NextResponse.redirect(
				new URL(
					`/auth/login?redirect=${req.nextUrl.pathname}`,
					req.url,
				),
			);
		}
	}
	// admin dashboard access
	if (req.nextUrl.pathname.startsWith('/user')) {
		if (!authenticated) {
			response.cookies.delete('vietfood_refresh_token');
			response.cookies.delete('vietfood_access_token');
			return NextResponse.redirect(
				new URL(
					`/auth/login?redirect=${req.nextUrl.pathname}`,
					req.url,
				),
			);
		} else if (
			authenticated.role === 'USER' ||
			authenticated.role === 'ADMIN'
		) {
			return;
		} else {
			response.cookies.delete('vietfood_refresh_token');
			response.cookies.delete('vietfood_access_token');
			return NextResponse.redirect(
				new URL(
					`/auth/login?redirect=${req.nextUrl.pathname}`,
					req.url,
				),
			);
		}
	}

	// Shop Authentication
	const shopCondition =
		req.nextUrl.pathname.startsWith('/shop') ||
		req.nextUrl.pathname.startsWith('/order') ||
		req.nextUrl.pathname.startsWith('/product');
	if (shopCondition) {
		if (!authenticated) {
			response.cookies.delete('vietfood_refresh_token');
			response.cookies.delete('vietfood_access_token');
			return NextResponse.redirect(
				new URL(
					`/auth/login?redirect=${req.nextUrl.pathname}`,
					req.url,
				),
			);
		} else if (
			authenticated.role === 'USER' ||
			authenticated.role === 'ADMIN'
		) {
			return;
		} else {
			response.cookies.delete('vietfood_refresh_token');
			response.cookies.delete('vietfood_access_token');
			return NextResponse.redirect(
				new URL(
					`/auth/login?redirect=${req.nextUrl.pathname}`,
					req.url,
				),
			);
		}
	}

	return;
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
