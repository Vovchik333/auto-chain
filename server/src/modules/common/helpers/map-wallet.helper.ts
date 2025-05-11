import { Wallet } from "src/schemas/wallet.schema";
import { mapTransactionFromDb } from "./map-transaction.helper";
import { mapStatisticsFromDb } from "./map-statistics.helper";

export const mapWalletFromDb = (wallet: Wallet) => ({
  id: wallet._id,
  address: wallet.address,
  statistics: mapStatisticsFromDb(wallet.statistics),
  isSyncWithBlockchain: wallet.isSyncWithBlockchain,
  userId: wallet.userId,
  transactions: wallet.transactions.map(mapTransactionFromDb)
});
