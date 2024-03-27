CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "analytics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"shortlinkId" uuid,
	"ip" text NOT NULL,
	"visitedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customDomain" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text,
	"domain" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text,
	"amount" numeric NOT NULL,
	"subscriptionId" uuid,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shortlink" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url" text NOT NULL,
	"longUrl" text NOT NULL,
	"expires" timestamp,
	"publicUrl" boolean DEFAULT false NOT NULL,
	"accessUrl" text,
	"hits" integer DEFAULT 0 NOT NULL,
	"userId" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"customDomainId" uuid,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"beginsAt" timestamp DEFAULT now(),
	"endsAt" timestamp,
	"userId" text,
	"tierId" uuid,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tier" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"price" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "analytics" ADD CONSTRAINT "analytics_shortlinkId_shortlink_id_fk" FOREIGN KEY ("shortlinkId") REFERENCES "shortlink"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customDomain" ADD CONSTRAINT "customDomain_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_subscriptionId_subscriptions_id_fk" FOREIGN KEY ("subscriptionId") REFERENCES "subscriptions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shortlink" ADD CONSTRAINT "shortlink_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shortlink" ADD CONSTRAINT "shortlink_customDomainId_customDomain_id_fk" FOREIGN KEY ("customDomainId") REFERENCES "customDomain"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_tierId_tier_id_fk" FOREIGN KEY ("tierId") REFERENCES "tier"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
