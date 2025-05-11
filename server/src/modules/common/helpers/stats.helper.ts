import { Model } from 'mongoose';
import { StatisticsDocument } from 'src/schemas/statistics.schema';
import { TransactionDocument } from 'src/schemas/transaction.schema';

export async function updateStatisticsForUser(
  userId: string,
  transactionModel: Model<TransactionDocument>,
  statisticsModel: Model<StatisticsDocument>,
) {
  const transactions = await transactionModel.find({ userId });

  const totalSent = transactions
    .filter(t => t.from === t.walletAddress)
    .reduce((sum, t) => sum + (t.value || 0), 0);

  const totalReceived = transactions
    .filter(t => t.to === t.walletAddress)
    .reduce((sum, t) => sum + (t.value || 0), 0);

  const totalFeeUsed = transactions.reduce((sum, t) => sum + (t.txnFee || 0), 0);

  const largest = transactions.reduce((max, t) =>
    t.value > (max?.value || 0) ? t : max, null);

  await statisticsModel.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        totalSent,
        totalReceived,
        totalTxCount: transactions.length,
        totalFeeUsed,
        largestAmountTransaction: largest?._id ?? null,
      },
    },
    { upsert: true, new: true }
  );
}