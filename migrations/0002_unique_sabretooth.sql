ALTER TABLE "goal" ADD COLUMN "best_time_title" text;--> statement-breakpoint
ALTER TABLE "goal" ADD COLUMN "best_time_description" text;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "frequency" text;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "duration" text;--> statement-breakpoint
ALTER TABLE "task" DROP COLUMN "best_time_title";--> statement-breakpoint
ALTER TABLE "task" DROP COLUMN "best_time_description";