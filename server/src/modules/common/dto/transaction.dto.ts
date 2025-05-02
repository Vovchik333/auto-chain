export type TransactionDto = {
  id: string;
  hash: string;
  from: string;
  to: string;
  value: number;
  date: string;
  status: string;
  gasUsed: string;
  block: string;
  method: string;
  confirmations: string;
  txnFee: number;
  category: string;
  ownerAddress: string;
};
