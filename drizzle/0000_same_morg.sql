CREATE TABLE IF NOT EXISTS "account" (
	"id" varchar PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "form" (
	"id" varchar PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3),
	"sessionId" varchar NOT NULL,
	"name" varchar NOT NULL,
	"details" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "submission" (
	"id" varchar PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3),
	"formId" varchar NOT NULL,
	"data" jsonb NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "form" ADD CONSTRAINT "fk__account_form" FOREIGN KEY ("sessionId") REFERENCES "public"."account"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submission" ADD CONSTRAINT "form_submission_fk" FOREIGN KEY ("formId") REFERENCES "public"."form"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
