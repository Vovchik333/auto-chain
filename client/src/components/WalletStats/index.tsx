'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { 
  ArrowDownIcon, 
  ArrowUpIcon, 
  WalletIcon, 
  CoinsIcon, 
  ExternalLinkIcon,
  Receipt
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { StatCard } from './StatCard';
import { StatsFilterDto } from '@/common/types/stats/stats-filter.dto';
import { useStatsStore } from '@/stores/statistics/statistics.store';
import { useEffect } from 'react';
import { formatStringNumber } from '@/lib/string.utils';
import { useTranslations } from 'next-intl';
import { AppRoute } from '@/common/enums/app-route';

type Props = {
  filter: StatsFilterDto;
};

export default function WalletStats({ filter }: Props) {
  const t = useTranslations('stats');
  const { stats, isLoading, loadStats } = useStatsStore();

  useEffect(() => {
    loadStats(filter);
  }, [filter]);

  if (isLoading || !stats) {
    return (
      <div className="text-muted-foreground theme-transition">
        {t('loading')}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <StatCard
          title={t('balance')}
          value={`${formatStringNumber(stats.balance)} ETH`}
          icon={<CoinsIcon className="h-5 w-5 text-primary theme-transition" />}
        />
        <StatCard
          title={t('totalSent')}
          value={`${formatStringNumber(stats.totalSent)} ETH`}
          icon={<ArrowUpIcon className="h-5 w-5 text-rose-400 theme-transition" />}
        />
        <StatCard
          title={t('totalReceived')}
          value={`${formatStringNumber(stats.totalReceived)} ETH`}
          icon={<ArrowDownIcon className="h-5 w-5 text-emerald-400 theme-transition" />}
        />
        <StatCard
          title={t('totalFees')}
          value={`${formatStringNumber(stats.totalFeeUsed)} ETH`}
          icon={<Receipt className="h-5 w-5 text-primary theme-transition" />}
        />
        <StatCard
          title={t('transactionCount')}
          value={stats.totalTxCount.toLocaleString()}
          icon={<WalletIcon className="h-5 w-5 text-primary theme-transition" />}
        />
      </div>

      {stats.largestAmountTransaction && (
        <Card className="rounded-2xl">
          <CardHeader className="px-6 pt-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-foreground theme-transition">
                {t('largestTransaction')}
              </CardTitle>
              <span className="text-xs text-muted-foreground theme-transition">
                {formatDistanceToNow(new Date(stats.largestAmountTransaction.date), { addSuffix: true })}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 px-6 pb-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between p-4 rounded-xl bg-secondary/50 theme-transition">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground theme-transition">{t('amount')}</div>
                <div className="font-medium text-foreground text-lg theme-transition">
                  {formatStringNumber(stats.largestAmountTransaction.value)} ETH
                </div>
              </div>
              <a
                href={`${AppRoute.TRANSACTIONS}/${stats.largestAmountTransaction.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background text-primary hover:bg-secondary transition-colors theme-transition"
              >
                <span className="text-sm">{t('viewOnEtherscan')}</span>
                <ExternalLinkIcon className="h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground theme-transition">{t('from')}</div>
                <code className="block p-4 rounded-xl bg-secondary/50 text-sm text-foreground break-all theme-transition">
                  {stats.largestAmountTransaction.from}
                </code>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground theme-transition">{t('to')}</div>
                <code className="block p-4 rounded-xl bg-secondary/50 text-sm text-foreground break-all theme-transition">
                  {stats.largestAmountTransaction.to}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}