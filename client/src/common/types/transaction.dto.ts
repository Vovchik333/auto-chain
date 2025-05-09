export type TransactionDto = {
  id: string;
  hash: string;
  from: string;
  to: string;
  value: number;
  date: string;
  status: string;
  method: string;
  txnFee: number;
  category: string;
  walletAddress: string;
  userId: string
};
