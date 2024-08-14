DO $$ BEGIN
 CREATE TYPE "public"."correct_option" AS ENUM('A', 'B', 'C', 'D');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."difficulty" AS ENUM('EASY', 'MEDIUM', 'HARD');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."login_method" AS ENUM('NORMAL', 'GOOGLE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."subscription_type" AS ENUM('NONE', 'PERM', 'TEMP');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."user_role" AS ENUM('ADMIN', 'USER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lms_academy" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(300) NOT NULL,
	"admin_id" uuid NOT NULL,
	"public_password" varchar(300),
	CONSTRAINT "lms_academy_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lms_admins" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_role" "user_role" DEFAULT 'ADMIN' NOT NULL,
	"username" varchar(300) NOT NULL,
	"password" varchar(300) NOT NULL,
	"email" varchar(200) NOT NULL,
	CONSTRAINT "lms_admins_username_unique" UNIQUE("username"),
	CONSTRAINT "lms_admins_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lms_test_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"subject" varchar(128) NOT NULL,
	"paper_category" varchar(128) NOT NULL,
	"academy_id" uuid NOT NULL,
	"statement" text NOT NULL,
	"option_a" text NOT NULL,
	"option_b" text NOT NULL,
	"option_c" text NOT NULL,
	"option_d" text NOT NULL,
	"correct_option" "correct_option" NOT NULL,
	"explanation" varchar NOT NULL,
	"paper_year" integer NOT NULL,
	"difficulty" "difficulty" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lms_user_stats" (
	"user_id" uuid NOT NULL,
	"subject" varchar(128) NOT NULL,
	"total_solved" integer NOT NULL,
	"total_correct" integer NOT NULL,
	"total_incorrect" integer NOT NULL,
	"total_hard" integer NOT NULL,
	"total_medium" integer NOT NULL,
	"total_easy" integer NOT NULL,
	"date" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lms_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(300) NOT NULL,
	"email" varchar(200) NOT NULL,
	"password" varchar(300) NOT NULL,
	"user_role" "user_role" DEFAULT 'USER' NOT NULL,
	"subscription_type" "subscription_type" DEFAULT 'NONE' NOT NULL,
	"free_tokens" integer DEFAULT 300 NOT NULL,
	"login_method" "login_method" DEFAULT 'NORMAL' NOT NULL,
	CONSTRAINT "lms_users_username_unique" UNIQUE("username"),
	CONSTRAINT "lms_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lms_academy" ADD CONSTRAINT "lms_academy_admin_id_lms_admins_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."lms_admins"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lms_test_data" ADD CONSTRAINT "lms_test_data_academy_id_lms_academy_id_fk" FOREIGN KEY ("academy_id") REFERENCES "public"."lms_academy"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lms_user_stats" ADD CONSTRAINT "lms_user_stats_user_id_lms_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."lms_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "subjectIndex" ON "lms_test_data" USING btree ("subject");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "yearIndex" ON "lms_test_data" USING btree ("paper_year");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "categoryIndex" ON "lms_test_data" USING btree ("paper_category");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "subjectStatIndex" ON "lms_user_stats" USING btree ("subject");