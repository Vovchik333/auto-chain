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
import { StatisticsDto } from '@/common/types/stats/statistics.dto';
import { formatDistanceToNow } from 'date-fns';
import { StatCard } from './StatCard';
import { StatsFilterDto } from '@/common/types/stats/stats-filter.dto';
import { useStatsStore } from '@/stores/statistics/statistics.store';
import { useEffect } from 'react';
import { formatStringNumber } from '@/lib/string.utils';

type Props = {
  filter: StatsFilterDto;
};

export default function WalletStats({ filter }: Props) {

  const { stats, isLoading, loadStats } = useStatsStore();

  useEffect(() => {
    loadStats(filter);
  }, [filter]);

  if (isLoading || !stats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <StatCard
          title="Balance"
          value={`${formatStringNumber(stats.balance)} ETH`}
          icon={<CoinsIcon className="h-5 w-5 text-[#00FFC6]" />}
        />
        <StatCard
          title="Total Sent"
          value={`${formatStringNumber(stats.totalSent)} ETH`}
          icon={<ArrowUpIcon className="h-5 w-5 text-rose-400" />}
        />
        <StatCard
          title="Total Received"
          value={`${formatStringNumber(stats.totalReceived)} ETH`}
          icon={<ArrowDownIcon className="h-5 w-5 text-emerald-400" />}
        />
        <StatCard
          title="Total Fees"
          value={`${formatStringNumber(stats.totalFeeUsed)} ETH`}
          icon={<Receipt className="h-5 w-5 text-[#00FFC6]" />}
        />
        <StatCard
          title="Transactions Count"
          value={stats.totalTxCount.toLocaleString()}
          icon={<WalletIcon className="h-5 w-5 text-[#00FFC6]" />}
        />
      </div>

      {stats.largestAmountTransaction && (
        <Card className="rounded-2xl shadow-sm bg-[#1A1F27] border border-[#2A2F3A] overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-[#CFCFCF]">Largest Transaction</CardTitle>
              <span className="text-xs text-[#9CA3AF]">
                {formatDistanceToNow(new Date(stats.largestAmountTransaction.date), { addSuffix: true })}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between p-4 rounded-lg bg-[#2A2F38]">
              <div className="space-y-1">
                <div className="text-sm text-[#9CA3AF]">Amount</div>
                <div className="font-medium text-white text-lg">
                  {formatStringNumber(stats.largestAmountTransaction.value)} ETH
                </div>
              </div>
              <a
                href={`https://etherscan.io/tx/${stats.largestAmountTransaction.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1A1F27] text-[#00FFC6] hover:bg-[#2A2F38] transition-colors"
              >
                <span className="text-sm">View on Etherscan</span>
                <ExternalLinkIcon className="h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-[#9CA3AF]">From</div>
                <code className="block p-3 rounded-lg bg-[#2A2F38] text-sm text-[#E5E7EB] break-all">
                  {stats.largestAmountTransaction.from}
                </code>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-[#9CA3AF]">To</div>
                <code className="block p-3 rounded-lg bg-[#2A2F38] text-sm text-[#E5E7EB] break-all">
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