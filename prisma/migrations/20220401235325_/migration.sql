/*
  Warnings:

  - A unique constraint covering the columns `[transactionReference]` on the table `Statement` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bankReference]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Statement_transactionReference_key" ON "Statement"("transactionReference");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_bankReference_key" ON "Transaction"("bankReference");
