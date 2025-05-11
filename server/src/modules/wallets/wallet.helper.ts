import { Transaction } from "src/schemas/transaction.schema";
import { mapTransactionFromDb } from "../common/helpers/map-transaction.helper";

export const getAnalyticsFromTxs = (
  txs: Transaction[],
  address: string,
) => {
  const analytics = {
    totalReceived: 0,
    totalSent: 0,
    totalFeeUsed: 0,
    totalTxCount: 0,
    largestAmountTransaction: txs.length === 0 ? '' : txs[0]._id,
  };

  let maxAmount = 0;
  const mappedTxsFromDb = txs.map(tx => {
    const mappedTx = mapTransactionFromDb(tx);

    analytics.totalFeeUsed += mappedTx.txnFee;
    if (mappedTx.from === address) {
      analytics.totalSent += mappedTx.value;
    } else {
      analytics.totalReceived += mappedTx.value;
    }

    if (mappedTx.value > maxAmount) {
      maxAmount = mappedTx.value;
      analytics.largestAmountTransaction = mappedTx.id;
    }

    return mappedTx;
  });

  analytics.totalTxCount = mappedTxsFromDb.length;

  return { analytics, mappedTxsFromDb };
}
