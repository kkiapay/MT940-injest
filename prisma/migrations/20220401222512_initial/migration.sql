-- CreateTable
CREATE TABLE "Statement" (
    "id" TEXT NOT NULL,
    "transactionReference" TEXT NOT NULL,
    "relatedReference" TEXT,
    "accountIdentification" TEXT,
    "number" JSONB,
    "statementDate" TEXT NOT NULL,
    "openingBalanceDate" TEXT NOT NULL,
    "closingBalanceDate" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "openingBalance" INTEGER NOT NULL,
    "closingBalance" INTEGER NOT NULL,
    "closingAvailableBalanceDate" TEXT NOT NULL,
    "forwardAvailableBalanceDate" TEXT NOT NULL,
    "closingAvailableBalance" INTEGER NOT NULL,
    "forwardAvailableBalance" INTEGER NOT NULL,
    "messageBlocks" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Statement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "statementId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "entryDate" TEXT NOT NULL,
    "fundsCode" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "isReversal" BOOLEAN NOT NULL,
    "transactionType" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "bankReference" TEXT NOT NULL,
    "extraDetails" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_statementId_fkey" FOREIGN KEY ("statementId") REFERENCES "Statement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
