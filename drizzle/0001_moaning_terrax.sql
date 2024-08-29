ALTER TABLE "form" DROP CONSTRAINT "fk__account_form";
--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "email" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "password" varchar;--> statement-breakpoint
ALTER TABLE "form" ADD COLUMN "account_id" varchar NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "form" ADD CONSTRAINT "fk__account_form" FOREIGN KEY ("account_id") REFERENCES "public"."account"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "form" DROP COLUMN IF EXISTS "sessionId";--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_email_unique" UNIQUE("email");