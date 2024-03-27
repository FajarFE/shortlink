import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/schema";

const queryClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle(queryClient, { schema });

export const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });
export const migrationDB = drizzle(migrationClient, { schema });
