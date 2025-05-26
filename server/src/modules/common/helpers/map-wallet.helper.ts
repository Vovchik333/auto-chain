import { Wallet } from "src/schemas/wallet.schema";

export const mapWalletFromDb = (wallet: Wallet) => ({
  id: wallet._id,
  address: wallet.address,
  name: wallet.name,
  isSyncWithBlockchain: wallet.isSyncWithBlockchain,
  userId: wallet.userId,
});
