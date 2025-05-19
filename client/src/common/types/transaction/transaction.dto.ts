export type TransactionDto = {
  id: string;
  hash: string;
  from: string;
  to: string;
  value: number;
  date: string;
  status: string;
  txnFee: number;
  category: string;
  walletId: string;
  userId: string
};
