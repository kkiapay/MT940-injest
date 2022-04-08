export interface IStatementQuery {
  transactionReference?: string;
  relatedReference?: string;
  accountIdentification?: string;
  statementDate?: string;
  openingBalanceDate?: string;
  closingBalanceDate?: string;
  currency?: string;
  openingBalance?: number;
  closingBalance?: number;
  closingAvailableBalanceDate?: string;
  forwardAvailableBalanceDate?: string;
  closingAvailableBalance?: number;
  forwardAvailableBalance?: number;
}

export interface ITransactionQuery {
  statementId?: string;
  fundsCode?: string;
  amount?: string;
  reference?: string;
  bankReference?: string;
  currency?: string;
}
