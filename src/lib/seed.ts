import { migrate } from "drizzle-orm/postgres-js/migrator";
import { migrationDB, migrationClient, db } from "@/lib/drizzle";

import * as schema from "@/schema";

const seedTrials = async () => {
	// Seed data for Free Trial
	const freeTrial = {
		name: "Free Trial",
		description:
			"Coba paket Free Trial kami dan nikmati kebebasan membuat 5 URL kustom dan 5 URL pribadi, serta pantau pengunjung secara real-time. Rasakan kemudahan menggunakan URL acak tanpa batasan, semua ini tanpa biaya.",
		features: [
			"5x Custom Url",
			"5x Private Url",
			"Melihat Jumlah Visitor/link",
			"Mendapatkan Asal Visitor",
			"Unlimited Random Url",
		],
		price: 0,
	};

	// Seed data for Basic Trial
	const basicTrial = {
		name: "Basic Trial",
		description:
			"Pilih paket Basic Trial untuk mengelola tautan dengan lebih baik. Dapatkan kebebasan membuat URL pribadi dan kustom tanpa batasan, serta akses analitik pengunjung. Hanya dengan harga 3000, tingkatkan efisiensi berbagi tautan Anda.",
		features: [
			"Unlimited Private Url",
			"Unlimited Custom Url",
			"Melihat Jumlah Visitor/link",
			"Mendapatkan Asal Visitor",
			"Unlimited Random Url",
			"Maksimal",
		],
		price: 3000,
	};

	const superTrial = {
		name: "Super Trial",
		description:
			"Bergabunglah dengan paket Super Trial kami untuk fitur terlengkap. Nikmati URL kustom dan pribadi gratis, bersama dengan domain kustom tak terbatas dan halaman kreasimu. Sertakan logo pada kode QR kustommu dan telusuri analitik pengunjung dengan leluasa. Hanya dengan 8000, tingkatkan kehadiran merekmu secara online.",
		features: [
			"Free Custom Url",
			"Free Private Url",
			"Unlimited Custom Url",
			"Unlimited Random Url",
			"Unlimited Custom Domain",
			"Unlimited Create Page",
			"Unlimited Custom qrCode",
			"Menambahkan Logo di qrCode",
			"Melihat Jumlah Visitor/link",
			"Mendapatkan Asal Visitor",
		],
		price: 8000,
	};

	try {
		await db.insert(schema.tier).values({
			name: freeTrial.name,
			description: freeTrial.description,
			features: freeTrial.features,
			price: freeTrial.price,
		});

		await db.insert(schema.tier).values({
			name: basicTrial.name,
			description: basicTrial.description,
			features: basicTrial.features,
			price: basicTrial.price,
		});

		// Insert Super Trial data into the database
		await db.insert(schema.tier).values({
			name: superTrial.name,
			description: superTrial.description,
			features: superTrial.features,
			price: superTrial.price,
		});

		console.log("Seed data successfully inserted.");
	} catch (error) {
		console.error("Error seeding data:", error);
	}
};

const main = async () => {
	await seedTrials();
};

main();
