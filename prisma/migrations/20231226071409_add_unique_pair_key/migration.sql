/*
  Warnings:

  - A unique constraint covering the columns `[providerAccountId,providerType]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Account_providerAccountId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Account_providerAccountId_providerType_key" ON "Account"("providerAccountId", "providerType");
