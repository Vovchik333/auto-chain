export type TransactionFilterDto = {
  userId?: string;
  walletAddress?: string;
  transactionHash?: string;
  from?: string;
  to?: string;
  status?: string;
  method?: string;
  category?: string;
}
