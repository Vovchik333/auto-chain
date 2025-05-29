'use client'

import WalletStats from "@/components/WalletStats";
import { useWalletStore } from "@/stores/wallet/wallet.store";
import { useParams } from "next/navigation";
import WalletHeader from "./components/WalletHeader";
import { useUserStore } from "@/stores/user/user.store";
import { useEffect } from "react";
import WalletSection from "./components/WalletSection";
import { withPrivateRoute } from "@/hoc/with-private-route.hoc";
import { useTranslations } from 'next-intl';

function WalletPage() {
  const t = useTranslations('wallet.details');
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

  if (!wallet) return <div>{t('loading')}</div>; 

  return (
    <>
      <WalletHeader wallet={wallet} />
      <WalletSection wallet={wallet} />
    </>
  );
}

export default withPrivateRoute(WalletPage);
