import { Transaction } from "src/schemas/transaction.schema";
import { EtherscanNormalTransactionDto } from "../dto/etherscan-normal-transaction.dto";
import { UserIdAndWalletIdDto } from "../dto/user-id-and-wallet-id.dto";
import { TransactionDto } from "../dto/transaction.dto";
import { ethers } from "ethers";

const calculateFee = (gasUsed: string, gasPrice: string): string => {
  const feeWei = BigInt(gasUsed) * BigInt(gasPrice);
  return ethers.formatUnits(feeWei, "ether");
};

const getTransactionType = (address: string, transaction: EtherscanNormalTransactionDto): "deposit" | "withdraw" => {
  if (address.toLowerCase() === transaction.to.toLowerCase() && address.toLowerCase() === transaction.from.toLowerCase()) {
    return "withdraw";
  }

  return address.toLowerCase() === transaction.to.toLowerCase() ? "deposit" : "withdraw";
};

export const mapTransactionFromList = (
  transaction: EtherscanNormalTransactionDto,
  userWallet: UserIdAndWalletIdDto,
  address: string
): Omit<TransactionDto, 'id'> => {
  const { walletId } = userWallet;

  return {
    hash: transaction.hash,
    from: transaction.from,
    to: transaction.to,
    value: ethers.formatUnits(transaction.value, "ether"),
    date: new Date(Number(transaction.timeStamp) * 1000).toISOString(),
    status: transaction.isError === "0" ? "Success" : "Failed",
    txnFee: calculateFee(transaction.gasUsed, transaction.gasPrice),
    category: "imported",
    walletId,
    type: address.toLowerCase() === transaction.to.toLowerCase() ? "deposit" : "withdraw"
  };
};

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
    txnFee: tx.txnFee,
    category: tx.category,
    walletId: tx.walletId,
    type: tx.type
  }
};
