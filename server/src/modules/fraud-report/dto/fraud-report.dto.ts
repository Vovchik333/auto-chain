type FraudReportDto = {
  id: string;
  fromAddress: string;
  toAddress: string;
  amount: string;
  transactionHash: string;
  description: string;
}

export { type FraudReportDto }
