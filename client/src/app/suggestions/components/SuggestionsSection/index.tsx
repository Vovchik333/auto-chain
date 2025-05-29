import React from 'react';
import { DiversificationDto } from '@/common/types/diversification.dto';
import { SuggestionList } from '../SuggestionList';
import { Wallet } from 'lucide-react';
import { WalletDto } from '@/common/types/wallet/wallet.dto';
import { TruncatedText } from '@/components/TruncatedText';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  diversification: DiversificationDto;
  wallets: WalletDto[];
}

export const SuggestionsSection: React.FC<Props> = ({ diversification, wallets }) => {
  const t = useTranslations('suggestions');
  const { transfers, total, target } = diversification;

  const involvedWallets = wallets.filter(wallet => 
    transfers.some(t => t.from === wallet.address || t.to === wallet.address)
  );

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card>
          <CardContent className="p-6">
            <span className="text-muted-foreground text-sm mb-2 block theme-transition">{t('stats.totalAmount')}</span>
            <span className="text-primary text-2xl font-semibold theme-transition">{total} ETH</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <span className="text-muted-foreground text-sm mb-2 block theme-transition">{t('stats.targetPerWallet')}</span>
            <span className="text-primary text-2xl font-semibold theme-transition">{target} ETH</span>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wallet className="w-5 h-5 mr-2 text-primary theme-transition" />
            {t('wallets.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {involvedWallets.map((wallet, index) => (
              <div
                key={wallet.id}
                className="bg-secondary/50 p-4 rounded-box-lg border border-border flex items-center justify-between theme-transition hover:border-primary"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center theme-transition">
                    <span className="text-primary font-medium theme-transition">{index + 1}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-foreground font-medium text-sm theme-transition">{wallet.name}</span>
                    <TruncatedText text={wallet.address} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-end gap-3">
                    <span className="text-muted-foreground text-xs theme-transition">{t('stats.currentBalance')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <svg 
              className="w-5 h-5 mr-2 text-primary theme-transition" 
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
        <CardContent>
          <SuggestionList suggestions={transfers} />
        </CardContent>
      </Card>
    </div>
  );
};