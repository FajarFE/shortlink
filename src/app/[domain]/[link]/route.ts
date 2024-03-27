"use server";
import { db } from "@/lib/drizzle";
import { eq, sql } from "drizzle-orm";
import { shortlink } from "@/schema";
import { redirect } from "next/navigation";
import { NextApiRequest, NextApiResponse } from "next";
import { headers } from "next/headers";
import requestIp from "request-ip";
import * as table from "@/schema";
import type { NextRequest } from "next/server";
import { unstable_cache } from "next/cache";

// Simple in-memory cache for only storing the longUrl
const cache: Record<string, string> = {};

export async function GET(
	req: NextApiRequest,
	{ params }: { params: { link: string; domain: string } }
) {
	const currentDomain = req.headers.host;
	const cacheKey = params.link;
	const shortlinks = await db
		.select()
		.from(shortlink)
		.where(eq(shortlink.shortUrl, params.link));
	if (shortlinks.length === 0) {
		return new Response("Not found", { status: 404 });
	} else {
		if (shortlinks[0].accessUrl === null || undefined) {
			await db
				.update(shortlink)
				.set({ hits: sql`${shortlink.hits}+1` })
				.where(eq(shortlink.id, shortlinks[0].id));

			await db.insert(table.analytics).values({
				ipAddress: headers().get("x-forwarded-for") as string,
				shortlinkId: shortlinks[0].id,
			});
			cache[cacheKey] = shortlinks[0].longUrl;

			return redirect(shortlinks[0].longUrl);
		} else {
			return redirect(`/accessUrl/${params.link}`);
		}
	}
}
