'use client'

import { withPrivateRoute } from "@/hoc/with-private-route.hoc";
import { useWalletStore } from "@/stores/wallet/wallet.store";
import WalletsHeader from "./components/WalletsHeader";
import { useUserStore } from "@/stores/user/user.store";
import { useEffect } from "react";
import WalletPreview from "./components/WalletPreview";

function Wallets() {
  const { user } = useUserStore()
  const { wallets, loadWallets } = useWalletStore();

  useEffect(() => {
    if (user === null) {
      return;
    }

    const { id: userId } = user;

    loadWallets({userId});
  }, [user]);

  return (
    <>
      <WalletsHeader />
      <div className="flex flex-col space-y-4 mt-4">
        {wallets.map((wallet, index) => (
          <WalletPreview 
            id={wallet.id}
            name={wallet.address}
            lastSynced={new Date(wallet.transactions[0].date).toLocaleString()}
            totalValue={wallet.statistics.totalReceived - wallet.statistics.totalSent}
            transactions={wallet.transactions.length}
            key={index} 
          />
        ))}
      </div>
    </>
  );
}

export default withPrivateRoute(Wallets);
