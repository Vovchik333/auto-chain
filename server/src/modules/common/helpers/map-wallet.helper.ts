import { Wallet } from "src/schemas/wallet.schema";
import { mapTransactionFromDb } from "./map-transaction.helper";

export const mapWalletFromDb = (wallet: Wallet) => ({
  id: wallet._id,
  address: wallet.address,
  statisticsId: wallet.statisticsId,
  isSyncWithBlockchain: wallet.isSyncWithBlockchain,
  userId: wallet.userId,
  transactions: wallet.transactions.map(mapTransactionFromDb)
});
