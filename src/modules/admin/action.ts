"use server";
import { db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import * as table from "@/schema";
import { custom } from "zod";
import { auth } from "@/lib/auth";
type ResponseState = {
	status: string | undefined;
	message: string | undefined;
	url?: string;
	customUrl?: string;
	customDomain?: string;
};
export async function createGuest(
	prevState: ResponseState,
	formData: FormData
): Promise<ResponseState> {
	const idUser = await auth();
	let urlIdentifier = generateRandomString();
	const customUrl = formData.get("customUrl") as string | undefined;
	const customDomain = formData.get("customDomain") as string | undefined;
	let response;
	let urlExist = await db
		.select()
		.from(table.shortlink)
		.where(eq(table.shortlink.shortUrl, urlIdentifier));
	while (urlExist.length > 0) {
		urlIdentifier = generateRandomString();
		urlExist = await db
			.select()
			.from(table.shortlink)
			.where(eq(table.shortlink.shortUrl, urlIdentifier));
	}
	if (customDomain === undefined || customDomain === null) {
		if (customUrl === undefined || customUrl === null) {
			const shortlink = await db
				.insert(table.shortlink)
				.values({
					shortUrl: urlIdentifier,
					longUrl: formData.get("url") as string,
					userId: idUser?.user?.id,
				})
				.returning({ id: table.shortlink.id });
			console.log(shortlink, "waodkaokdo");

			if (shortlink.length === 0) {
				response = { status: "error", message: "Could not create shortlink" };
			} else {
				response = { status: "success", message: "ok", url: urlIdentifier };
			}
		} else {
			const shortlink = await db
				.insert(table.shortlink)
				.values({
					shortUrl: customUrl,
					longUrl: formData.get("url") as string,
					userId: idUser?.user?.id,
				})
				.returning({ id: table.shortlink.id });

			console.log(shortlink, "ngentod");
			if (shortlink.length === 0) {
				response = { status: "error", message: "Could not create shortlink" };
			} else {
				response = {
					status: "success",
					message: "ok",
					customUrl: customUrl as string,
				};
			}
		}
	} else {
		const domainExist = await db
			.select()
			.from(table.customDomain)
			.where(eq(table.customDomain.domain, customDomain));
		console.log(domainExist, "ngentod");
		if (domainExist.length === 0) {
			const CustomDomainData = await db
				.insert(table.customDomain)
				.values({
					domain: customDomain,
					userId: idUser?.user?.id,
				})
				.returning({
					id: table.customDomain.id,
				});
			console.log(customDomain, "awodkaod");
			if (customDomain.length === 0) {
				response = {
					status: "error",
					message: "Could not create domain",
				};
			} else {
				let urlExist = await db
					.select()
					.from(table.shortlink)
					.where(eq(table.shortlink.shortUrl, urlIdentifier));
				while (urlExist.length > 0) {
					urlIdentifier = generateRandomString();
					urlExist = await db
						.select()
						.from(table.shortlink)
						.where(eq(table.shortlink.shortUrl, urlIdentifier));
				}
				if (customUrl === undefined || customUrl === null) {
					const shortlink = await db
						.insert(table.shortlink)
						.values({
							shortUrl: urlIdentifier,
							customDomainId: CustomDomainData[0].id,
							longUrl: formData.get("url") as string,
							userId: idUser?.user?.id,
						})
						.returning({ id: table.shortlink.id });

					if (shortlink.length === 0) {
						response = {
							status: "error",
							message: "Could not create shortlink",
						};
					} else {
						response = {
							status: "success",
							message: "ok",
							url: urlIdentifier,
						};
					}
				} else {
					const shortlink = await db
						.insert(table.shortlink)
						.values({
							shortUrl: customUrl,
							longUrl: formData.get("url") as string,
							userId: idUser?.user?.id,
							customDomainId: CustomDomainData[0].id,
						})
						.returning({ id: table.shortlink.id });
					if (shortlink.length === 0) {
						response = {
							status: "error",
							message: "Could not create shortlink",
						};
					} else {
						response = {
							status: "success",
							message: "ok",
							customUrl: customUrl as string,
						};
					}
				}
				response = {
					status: "success",
					message: "ok",
					customDomain: customDomain as string,
				};
			}
		}
		response = { status: "success", message: "ok" };
	}
	return response;
}

function generateRandomString(): string {
	const characters =
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";
	const minLength = 4;
	const maxLength = 6;
	const length =
		Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
	let randomString = "";

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		randomString += characters[randomIndex];
	}
	return randomString;
}
