import { EtherscanNormalTransactionDto } from "../dto/etherscan-normal-transaction.dto";

const calculateFee = (gasUsed: string, gasPrice: string) => {
  const feeWei = BigInt(gasUsed) * BigInt(gasPrice);
  const feeEth = Number(feeWei) / 1e18; // 1e18 is 1,000,000,000,000,000,000 (1 Ether in Wei)
  return feeEth;
};

export const mapTransaction = (transaction: EtherscanNormalTransactionDto, ownerAddress: string) => {
  return {
    hash: transaction.hash,
    from: transaction.from,
    to: transaction.to,
    value: Number(transaction.value) / 1e18,
    date: new Date(Number(transaction.timeStamp) * 1000).toString(),
    status: transaction.isError === "0" ? "Success" : "Failed",
    gasUsed: `${transaction.gasUsed} / ${transaction.gas}`,
    block: transaction.blockNumber,
    method: transaction.functionName || "Transfer",
    confirmations: transaction.confirmations,
    txnFee: calculateFee(transaction.gasUsed, transaction.gasPrice),
    category: 'imported',
    ownerAddress
  };
}
