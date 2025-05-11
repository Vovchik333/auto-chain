import { Transaction } from "src/schemas/transaction.schema";
import { EtherscanNormalTransactionDto } from "../dto/etherscan-normal-transaction.dto";
import { UserWalletAddressDto } from "../dto/user-wallet-address.dto";
import { TransactionDto } from "../dto/transaction.dto";

const calculateFee = (gasUsed: string, gasPrice: string) => {
  const feeWei = BigInt(gasUsed) * BigInt(gasPrice);
  const feeEth = Number(feeWei) / 1e18; // 1e18 is 1,000,000,000,000,000,000 (1 Ether in Wei)
  return feeEth;
};

export const mapTransaction = (
  transaction: EtherscanNormalTransactionDto, 
  userWallet: UserWalletAddressDto
): Omit<TransactionDto, 'id'> => {
  const { userId, address: walletAddress } = userWallet;

  return {
    hash: transaction.hash,
    from: transaction.from,
    to: transaction.to,
    value: Number(transaction.value) / 1e18,
    date: new Date(Number(transaction.timeStamp) * 1000).toString(),
    status: transaction.isError === "0" ? "Success" : "Failed",
    method: transaction.functionName || "Transfer",
    txnFee: calculateFee(transaction.gasUsed, transaction.gasPrice),
    category: 'imported',
    userId,
    walletAddress
  };
}

export const mapTransactionFromDb = (tx: Transaction): TransactionDto => {
  if (!tx) {
    return undefined;
  }

  return {
    id: tx._id,
    hash: tx.hash,
    from: tx.from,
    to: tx.to,
    value: tx.value,
    date: tx.date,
    status: tx.status,
    method: tx.method,
    txnFee: tx.txnFee,
    category: tx.category,
    walletAddress: tx.walletAddress,
    userId: tx.userId
  }
};
