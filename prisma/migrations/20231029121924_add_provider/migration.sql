/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `bio` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "AcccountProvider" AS ENUM ('google');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" "AcccountProvider"[] DEFAULT ARRAY[]::"AcccountProvider"[],
ALTER COLUMN "bio" SET NOT NULL,
ALTER COLUMN "bio" SET DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
