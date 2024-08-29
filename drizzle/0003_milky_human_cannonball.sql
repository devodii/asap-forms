CREATE TABLE IF NOT EXISTS "password_reset" (
	"id" varchar PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"user_id" varchar,
	"last_used" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "form" DROP CONSTRAINT "fk__account_form";
--> statement-breakpoint
ALTER TABLE "submission" DROP CONSTRAINT "form_submission_fk";
--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "updated_at" timestamp (3);--> statement-breakpoint
ALTER TABLE "form" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "form" ADD COLUMN "updated_at" timestamp (3);--> statement-breakpoint
ALTER TABLE "submission" ADD COLUMN "form_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "submission" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "submission" ADD COLUMN "updated_at" timestamp (3);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "password_reset" ADD CONSTRAINT "fk__password_reset_user" FOREIGN KEY ("user_id") REFERENCES "public"."account"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "form" ADD CONSTRAINT "fk__account_form" FOREIGN KEY ("account_id") REFERENCES "public"."account"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submission" ADD CONSTRAINT "fk__form_submission" FOREIGN KEY ("form_id") REFERENCES "public"."form"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN IF EXISTS "createdAt";--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN IF EXISTS "updatedAt";--> statement-breakpoint
ALTER TABLE "form" DROP COLUMN IF EXISTS "createdAt";--> statement-breakpoint
ALTER TABLE "form" DROP COLUMN IF EXISTS "updatedAt";--> statement-breakpoint
ALTER TABLE "submission" DROP COLUMN IF EXISTS "createdAt";--> statement-breakpoint
ALTER TABLE "submission" DROP COLUMN IF EXISTS "updatedAt";--> statement-breakpoint
ALTER TABLE "submission" DROP COLUMN IF EXISTS "formId";