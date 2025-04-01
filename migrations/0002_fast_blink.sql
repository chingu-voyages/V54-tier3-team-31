DROP TABLE "goal_log" CASCADE;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "best_time_title" text;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "best_time_description" text;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "completed" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "goal" DROP COLUMN "best_time_title";--> statement-breakpoint
ALTER TABLE "goal" DROP COLUMN "best_time_description";