export type CreateTxDto = {
  from: string;
  to: string;
  value: string;
  date: string;
  txnFee: string;
  type: string;
  category: string;
  walletId: string;
}
