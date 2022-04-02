import { Prisma } from '@prisma/client';

export interface Statement {
  transactionReference: string;
  relatedReference?: string;
  accountIdentification?: string;
  number?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;
  statementDate: string;
  openingBalanceDate: string;
  closingBalanceDate: string;
  currency: string;
  openingBalance: number;
  closingBalance: number;
  transactions?: Prisma.TransactionCreateNestedManyWithoutStatementInput;
  closingAvailableBalanceDate: string;
  forwardAvailableBalanceDate: string;
  closingAvailableBalance: number;
  forwardAvailableBalance: number;
  messageBlocks?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;
}

export interface Transaction {
  date: string;
  entryDate: string;
  fundsCode: string;
  amount: number;
  isReversal: boolean;
  transactionType: string;
  reference: string;
  bankReference: string;
  extraDetails: string;
  currency: string;
  details: string;
}

export interface StatementNumber {
  statement: string;
  sequence: string;
  section: string;
}
