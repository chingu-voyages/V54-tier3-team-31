ALTER TABLE "task" DROP CONSTRAINT "task_goal_id_goal_id_fk";
--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "goal_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "goal" ADD COLUMN "best_time_title" text;--> statement-breakpoint
ALTER TABLE "goal" ADD COLUMN "best_time_description" text;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_goal_id_goal_id_fk" FOREIGN KEY ("goal_id") REFERENCES "public"."goal"("id") ON DELETE set null ON UPDATE no action;