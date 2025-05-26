export type TransactionDto = {
  id: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  date: string;
  status: string;
  txnFee: string;
  category: string;
  walletId: string;
};
