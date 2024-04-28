import {
	timestamp,
	pgTable,
	text,
	primaryKey,
	integer,
	uuid,
	boolean,
	numeric,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";
import { features, title } from "process";
import { array } from "zod";
import { longtext } from "drizzle-orm/mysql-core";

export const users = pgTable("user", {
	id: text("id").notNull().primaryKey(),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image"),
});

export const accounts = pgTable(
	"account",
	{
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: text("type").$type<AdapterAccount["type"]>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	})
);

export const sessions = pgTable("session", {
	sessionToken: text("sessionToken").notNull().primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
	"verificationToken",
	{
		identifier: text("identifier").notNull(),
		token: text("token").notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
	})
);

export const shortlink = pgTable("shortlink", {
	id: uuid("id").defaultRandom().primaryKey(),
	shortUrl: text("url").notNull(),
	longUrl: text("longUrl").notNull(),
	expires: timestamp("expires", { mode: "date" }),
	publicUrl: boolean("publicUrl").notNull().default(false),
	accessUrl: text("accessUrl"),
	hits: integer("hits").notNull().default(0),
	userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
	createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
	updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
	customDomainId: uuid("customDomainId").references(() => customDomain.id, {
		onDelete: "cascade",
	}),
	deletedAt: timestamp("deletedAt", { mode: "date" }),
});

export const customDomain = pgTable("customDomain", {
	id: uuid("id").defaultRandom().primaryKey(),
	userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
	domain: text("domain").notNull(),
	createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
	updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
	deletedAt: timestamp("deletedAt", { mode: "date" }),
});

export const analytics = pgTable("analytics", {
	id: uuid("id").defaultRandom().primaryKey(),
	shortlinkId: uuid("shortlinkId").references(() => shortlink.id, {
		onDelete: "cascade",
	}),
	ipAddress: text("ip").notNull(),
	country: text("country"),
	visitedAt: timestamp("visitedAt", { mode: "date" }).defaultNow(),
});

export const template = pgTable("template", {
	id: uuid("id").defaultRandom().primaryKey(),
	landingPageId: uuid("landingPageId").references(() => landingPage.id, {
		onDelete: "cascade",
	}),
	detailPageId: uuid("detailPageId").references(() => detailPage.id, {
		onDelete: "cascade",
	}),
	categoryId: uuid("categoryId").references(() => categoryPage.id, {
		onDelete: "cascade",
	}),
	userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
});

export const keywords = pgTable("keywords", {
	id: uuid("id").defaultRandom().primaryKey(),
	keyword: text("keyword").notNull(),
	templateId: uuid("templateId").references(() => template.id, {
		onDelete: "cascade",
	}),
});

export const landingPage = pgTable("landingPage", {
	id: uuid("id").defaultRandom().primaryKey(),
	componentId: text("componentId").references(() => componentPage.id, {
		onDelete: "cascade",
	}),
});

export const detailPage = pgTable("detailPage", {
	id: uuid("id").defaultRandom().primaryKey(),
	componentId: text("componentId").references(() => componentPage.id, {
		onDelete: "cascade",
	}),
});

export const componentPage = pgTable("componentPage", {
	id: uuid("id").defaultRandom().primaryKey(),
	component: text("component").notNull(),
});

export const navbarData = pgTable("navbarData", {
	id: uuid("id").defaultRandom().primaryKey(),
	image: text("image"),
	navbar: text("navbar").array(),
});

export const socialMedia = pgTable("socialMedia", {
	id: uuid("id").defaultRandom().primaryKey(),
	facebook: text("facebook"),
	tiktok: text("tiktok"),
	instagram: text("instagram"),
	whatsapp: text("whatsapp"),
});

export const productData = pgTable("productData", {
	id: uuid("id").defaultRandom().primaryKey(),
	title: text("tile").notNull(),
	desc: text("desc").notNull(),
	image: text("image").notNull(),
});

export const metaData = pgTable("metaData", {
	id: uuid("id").defaultRandom().primaryKey(),
	title: text("title").notNull(),
	desc: text("desc").notNull(),
});

export const categoryPage = pgTable("categoryPage", {
	id: uuid("id").defaultRandom().primaryKey(),
});

export const subscriptions = pgTable("subscriptions", {
	id: uuid("id").defaultRandom().primaryKey(),
	beginsAt: timestamp("beginsAt", { mode: "date" }).defaultNow(),
	endsAt: timestamp("endsAt", { mode: "date" }),
	userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
	tierId: uuid("tierId").references(() => tier.id, { onDelete: "cascade" }),
	createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
	updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
	deletedAt: timestamp("deletedAt", { mode: "date" }),
});

export const payments = pgTable("payments", {
	id: uuid("id").defaultRandom().primaryKey(),
	userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
	amount: numeric("amount").notNull(),
	subscriptionId: uuid("subscriptionId").references(() => subscriptions.id, {
		onDelete: "cascade",
	}),
	createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
	updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
	deletedAt: timestamp("deletedAt", { mode: "date" }),
});

export const tier = pgTable("tier", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: text("name").notNull(),
	description: text("description").notNull(),
	features: text("features").array(),
	price: integer("price").notNull(),
});
