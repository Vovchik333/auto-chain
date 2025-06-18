import React from 'react';
import { DiversificationDto } from '@/common/types/diversification.dto';
import { SuggestionList } from '../SuggestionList';
import { Wallet } from 'lucide-react';
import { WalletDto } from '@/common/types/wallet/wallet.dto';
import { TruncatedText } from '@/components/TruncatedText';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatStringNumber } from '@/lib/string.utils';

interface Props {
  diversification: DiversificationDto;
  wallets: WalletDto[];
}


export const SuggestionsSection: React.FC<Props> = ({ diversification, wallets }) => {
  const t = useTranslations('suggestions');
  const { transfers, total, target, wallets: walletsWithBalances } = diversification;

  const involvedWallets = wallets.filter(wallet => 
    transfers.some(t => t.from === wallet.address || t.to === wallet.address)
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <span className="text-muted-foreground text-sm mb-3 block theme-transition">{t('stats.totalAmount')}</span>
            <span className="text-primary text-2xl font-medium theme-transition">{formatStringNumber(total)} ETH</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <span className="text-muted-foreground text-sm mb-3 block theme-transition">{t('stats.targetPerWallet')}</span>
            <span className="text-primary text-2xl font-medium theme-transition">{formatStringNumber(target)} ETH</span>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="px-6 pt-6">
          <CardTitle className="flex items-center gap-3 text-foreground theme-transition">
            <Wallet className="w-5 h-5 text-primary theme-transition" />
            {t('wallets.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="grid gap-4">
            {involvedWallets.map((wallet, index) => (
              <div
                key={wallet.id}
                className="bg-secondary/50 p-6 rounded-md border border-border flex items-center justify-between theme-transition hover:border-primary"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0 theme-transition">
                    <span className="text-primary font-medium theme-transition">{index + 1}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-foreground font-medium text-sm theme-transition">{wallet.name}</span>
                    <TruncatedText text={wallet.address} className="text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-muted-foreground text-sm theme-transition">{t('stats.currentBalance')}</span>
                    <span className="text-primary text-sm font-medium theme-transition">{formatStringNumber(walletsWithBalances.find(w => w.address === wallet.address)?.balance || '0')} ETH</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-6 pt-6">
          <CardTitle className="flex items-center gap-3 text-foreground theme-transition">
            <svg 
              className="w-5 h-5 text-primary theme-transition" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" 
              />
            </svg>
            {t('transfers.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <SuggestionList suggestions={transfers} />
        </CardContent>
      </Card>
    </div>
  );
};