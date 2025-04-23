type CreateFraudReportDto = {
  description: string;
  fromAddress: string;
  toAddress: string;
  amount: string;
  transactionHash: string;
  signature: string;
}

export { type CreateFraudReportDto }
