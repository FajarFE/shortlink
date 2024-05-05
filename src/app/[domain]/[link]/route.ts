"use server";
import { db } from "@/lib/drizzle";
import { and, eq, or, sql } from "drizzle-orm";
import { shortlink } from "@/schema";
import { redirect } from "next/navigation";
import { NextApiRequest, NextApiResponse } from "next";
import { headers } from "next/headers";
import requestIp from "request-ip";
import * as table from "@/schema";
import type { NextRequest } from "next/server";
import { unstable_cache } from "next/cache";
import { PgUUID } from "drizzle-orm/pg-core";

// Simple in-memory cache for only storing the longUrl

export async function GET(
	req: NextRequest,
	{ params }: { params: { link: string; domain: string } }
) {
	console.log(params.link);
	console.log(params.domain);
	console.log("dapat");
	if (params.domain === "home") {
		const shortlinks = await db
			.select({
				id: shortlink.id,
				longUrl: shortlink.longUrl,
				shortUrl: shortlink.shortUrl,
				accessUrl: shortlink.accessUrl,
				hits: shortlink.hits,
			})
			.from(shortlink)
			.where(or(eq(shortlink.shortUrl, params.link)));

		console.log(shortlinks, "iawjdiajdiajdia");
		if (shortlinks.length === 0) {
			return redirect(`http://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/404`);
		} else {
			if (shortlinks[0].accessUrl === null || undefined) {
				await db
					.update(shortlink)
					.set({ hits: sql`${shortlink.hits}+1` })
					.where(eq(shortlink.id, shortlinks[0].id as string));

				await db.insert(table.analytics).values({
					ipAddress: headers().get("x-forwarded-for") as string,
					shortlinkId: shortlinks[0].id,
				});

				return redirect(shortlinks[0].longUrl as string);
			} else {
				return redirect(`/accessUrl/${params.link}`);
			}
		}
	} else {
		const shortlinks = await db
			.select({
				id: shortlink.id,
				longUrl: shortlink.longUrl,
				shortUrl: shortlink.shortUrl,
				accessUrl: shortlink.accessUrl,
				hits: shortlink.hits,
				customDomainId: shortlink.customDomainId,
				domain: table.customDomain.domain,
			})
			.from(shortlink)
			.where(
				or(
					eq(shortlink.shortUrl, params.link),
					eq(table.customDomain.domain, params.domain as string)
				)
			)
			.rightJoin(
				table.customDomain,
				eq(shortlink.customDomainId, table.customDomain.id)
			);

		console.log(shortlinks);
		if (shortlinks.length === 0) {
			return redirect(`http://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/404`);
		} else {
			if (shortlinks[0].accessUrl === null || undefined) {
				await db
					.update(shortlink)
					.set({ hits: sql`${shortlink.hits}+1` })
					.where(eq(shortlink.id, shortlinks[0].id as string));

				await db.insert(table.analytics).values({
					ipAddress: headers().get("x-forwarded-for") as string,
					shortlinkId: shortlinks[0].id,
				});

				return redirect(shortlinks[0].longUrl as string);
			} else {
				return redirect(`/accessUrl/${params.link}`);
			}
		}
	}
}
