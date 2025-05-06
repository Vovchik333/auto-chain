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
    largestAmountTransaction: '',
  };

  const mappedTxsFromDb = txs.map(tx => {
    const mappedTx = mapTransactionFromDb(tx);

    analytics.totalFeeUsed += mappedTx.txnFee;
    if (mappedTx.from === address) {
      analytics.totalSent += mappedTx.value;
    } else {
      analytics.totalReceived += mappedTx.value;
    }

    return mappedTx;
  });

  analytics.totalTxCount = mappedTxsFromDb.length;

  return { analytics, mappedTxsFromDb };
}
