'use client'

import { withPrivateRoute } from "@/hoc/with-private-route.hoc";
import { useWalletStore } from "@/stores/wallet/wallet.store";
import WalletsHeader from "./components/WalletsHeader";
import { useUserStore } from "@/stores/user/user.store";
import { useEffect, useState } from "react";
import WalletPreview from "./components/WalletPreview";
import { Loader2, Plus } from "lucide-react";
import { WalletDto } from "@/common/types/wallet/wallet.dto";
import { useTranslations } from 'next-intl';

function Wallets() {
  const t = useTranslations('wallet');
  const { user } = useUserStore()
  const { wallets, loadWallets, isLoading } = useWalletStore();
  const [filteredWallets, setFilteredWallets] = useState<WalletDto[]>(wallets);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredWallets(wallets);
    } else {
      setFilteredWallets(
        wallets.filter((wallet) =>
          wallet?.address?.toLowerCase().includes(query.toLowerCase()) ||
          (wallet.name && wallet.name.toLowerCase().includes(query.toLowerCase()))
        )
      );
    }
  };
  console.log(filteredWallets)

  useEffect(() => {
    if (user === null) return;
    const { id: userId } = user;
    loadWallets({ userId });
  }, [user]);

  useEffect(() => {
    if (wallets !== undefined) {
      setFilteredWallets(wallets);
    }
  }, [wallets]);

  return (
    <div className="min-h-screen bg-background theme-transition">
      <div className="mx-auto space-y-6">
        <WalletsHeader onSearch={handleSearch} />
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-2 text-primary theme-transition">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>{t('loading')}</span>
            </div>
          </div>
        ) : filteredWallets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            {searchQuery ? (
              <>
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 theme-transition">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 theme-transition">
                  {t('search.noResults.title')}
                </h3>
                <p className="text-muted-foreground max-w-sm theme-transition">
                  {t('search.noResults.description')}
                </p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 theme-transition">
                  <Plus className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 theme-transition">
                  {t('noWallets.title')}
                </h3>
                <p className="text-muted-foreground max-w-sm theme-transition">
                  {t('noWallets.description')}
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            {filteredWallets.map((wallet) => (
              <WalletPreview key={wallet.id} wallet={wallet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default withPrivateRoute(Wallets);
