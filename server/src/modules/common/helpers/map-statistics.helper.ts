import { Statistics } from "src/schemas/statistics.schema";
import { StatisticsDto } from "src/common/types/statistics.dto";
import { mapTransactionFromDb } from "./map-transaction.helper";

export const mapStatisticsFromDb = (statistics: Statistics): StatisticsDto => ({
  id: statistics._id,
  totalReceived: statistics.totalReceived,
  totalSent: statistics.totalSent,
  totalFeeUsed: statistics.totalFeeUsed,
  totalTxCount: statistics.totalTxCount,
  largestAmountTransaction: mapTransactionFromDb(statistics.largestAmountTransaction),
});
