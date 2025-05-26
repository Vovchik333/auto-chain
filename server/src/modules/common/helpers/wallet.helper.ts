import { Transaction } from "src/schemas/transaction.schema";
import { mapTransactionFromDb } from "./map-transaction.helper";
import { ethers } from "ethers";

export const toBigint = (value: string) => {
  return ethers.parseUnits(value, 'ether');
}

export const getAnalyticsFromTxs = (
  txs: Transaction[],
  address: string,
) => {
  let totalReceived = 0n;
  let totalSent = 0n;
  let totalFeeUsed = 0n;
  let maxAmount = 0n;
  let largestAmountTransaction = txs.length === 0 ? '' : txs[0]._id;

  const mappedTxsFromDb = txs.map(tx => {
    const mappedTx = mapTransactionFromDb(tx);
    const valueInWei = ethers.parseUnits(mappedTx.value, "ether"); // BigInt
    const feeInWei = ethers.parseUnits(mappedTx.txnFee ?? '0', "ether");

    if (mappedTx.status.toLowerCase() === 'success') {
      if (mappedTx.from.toLowerCase() === address.toLowerCase()) {
        totalSent += valueInWei;
        totalFeeUsed += feeInWei;
      } else {
        totalReceived += valueInWei;
      }

      if (valueInWei > maxAmount) {
        maxAmount = valueInWei;
        largestAmountTransaction = mappedTx.id;
      }
    }

    return mappedTx;
  });

  const balance = totalReceived - totalSent - totalFeeUsed;

  const analytics = {
    balance: ethers.formatUnits(balance, "ether"),
    totalReceived: ethers.formatUnits(totalReceived, "ether"),
    totalSent: ethers.formatUnits(totalSent, "ether"),
    totalFeeUsed: ethers.formatUnits(totalFeeUsed, "ether"),
    totalTxCount: mappedTxsFromDb.length.toString(),
    largestAmountTransaction,
  };

  return { analytics };
};