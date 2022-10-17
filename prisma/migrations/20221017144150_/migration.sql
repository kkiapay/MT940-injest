-- DropIndex
DROP INDEX "Transaction_bankReference_key";

-- AlterTable
ALTER TABLE "Statement" ADD COLUMN     "fileHash" TEXT;
