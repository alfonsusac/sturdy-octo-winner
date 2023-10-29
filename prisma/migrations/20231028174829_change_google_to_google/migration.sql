/*
  Warnings:

  - The values [Google] on the enum `AcccountProvider` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AcccountProvider_new" AS ENUM ('google');
ALTER TABLE "User" ALTER COLUMN "provider" TYPE "AcccountProvider_new" USING ("provider"::text::"AcccountProvider_new");
ALTER TYPE "AcccountProvider" RENAME TO "AcccountProvider_old";
ALTER TYPE "AcccountProvider_new" RENAME TO "AcccountProvider";
DROP TYPE "AcccountProvider_old";
COMMIT;
