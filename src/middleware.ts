import { NextRequest, NextResponse } from "next/server";

export const config = {
	matcher: [
		/*
		 * Match all paths except for:
		 * 1. /api routes
		 * 2. /_next (Next.js internals)
		 * 3. /_static (inside /public)
		 * 4. all root files inside /public (e.g. /favicon.ico)
		 */
		"/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
	],
};

export default async function middleware(req: NextRequest) {
	const url = req.nextUrl;
	// Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
	let hostname = req.headers
		.get("host")!
		.replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

	const searchParams = req.nextUrl.searchParams.toString();
	// Get the pathname of the request (e.g. /, /about, /blog/first-post)
	const path = `${url.pathname}${
		searchParams.length > 0 ? `?${searchParams}` : ""
	}`;

	const isDefaultDomain = hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN;
	if (isDefaultDomain) {
		return NextResponse.rewrite(
			new URL(`/home${path === "/" ? "" : path}`, req.url)
		);
	}

	// rewrite everything else to `/[domain]/[slug] dynamic route
	return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}
