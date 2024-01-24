/*
  Warnings:

  - You are about to drop the column `avatar_url` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar_url",
ADD COLUMN     "image" TEXT,
ALTER COLUMN "created_at" DROP NOT NULL;
