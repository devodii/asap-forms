ALTER TABLE "form" ADD COLUMN "title" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "form" ADD COLUMN "description" varchar;--> statement-breakpoint
ALTER TABLE "form" DROP COLUMN IF EXISTS "name";