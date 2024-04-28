"use server";
import { LandingPage } from "@/modules/landingPage";
import { db } from "@/lib/drizzle";
import { shortlink } from "@/schema";
import { eq } from "drizzle-orm";

export default async function Home() {
	return <>skibidi</>;
}
