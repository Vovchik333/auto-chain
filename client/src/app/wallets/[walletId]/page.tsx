'use client'

import WalletStats from "@/components/WalletStats";
import { useWalletStore } from "@/stores/wallet/wallet.store";
import { useParams } from "next/navigation";
import WalletHeader from "./components/WalletHeader";
import { useUserStore } from "@/stores/user/user.store";
import { useEffect } from "react";
import WalletSection from "./components/WalletSection";

export default function WalletPage() {
  const params = useParams();
  const walletId = params.walletId;

  const { user } = useUserStore()
  const { wallets, loadWallets } = useWalletStore();

  useEffect(() => {
    if (user === null) {
      return;
    }

    const { id: userId } = user;

    loadWallets({userId});
  }, [user]);

  const wallet = wallets.find(w => w.id === walletId);

  if (!wallet) return <div>Loading...</div>; 

  return (
    <>
      <WalletHeader name={wallet.address} />
      <WalletSection wallet={wallet} />
    </>
  );
}