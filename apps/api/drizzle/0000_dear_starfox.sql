CREATE TABLE IF NOT EXISTS "Tasks" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"createdAt" date NOT NULL,
	"completedAt" date
);
