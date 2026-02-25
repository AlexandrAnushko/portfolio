-- CreateTable
CREATE TABLE "TodoFolder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TodoFolder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TodoFolder" ADD CONSTRAINT "TodoFolder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Add folderId as nullable first to allow data migration
ALTER TABLE "Todo" ADD COLUMN "folderId" TEXT;

-- Create a "Main" folder for every existing user and assign all their todos to it
INSERT INTO "TodoFolder" ("id", "name", "createdAt", "userId")
SELECT
    gen_random_uuid()::text,
    'Main',
    NOW(),
    "User"."id"
FROM "User";

-- Assign each todo to its user's Main folder
UPDATE "Todo"
SET "folderId" = "TodoFolder"."id"
FROM "TodoFolder"
WHERE "Todo"."userId" = "TodoFolder"."userId"
  AND "TodoFolder"."name" = 'Main';

-- Now make folderId NOT NULL
ALTER TABLE "Todo" ALTER COLUMN "folderId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "TodoFolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
