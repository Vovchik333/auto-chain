'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowDownIcon, ArrowUpIcon, WalletIcon, CoinsIcon, TrendingUpIcon, ExternalLinkIcon } from 'lucide-react';
import { StatisticsDto } from '@/common/types/statistics.dto';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

type Props = {
  stats: StatisticsDto;
};

const formatEth = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  }).format(value);
};

const formatUsd = (ethValue: number) => {
  const ethPrice = 2000; // This should come from an API in production
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(ethValue * ethPrice);
};

const StatCard = ({ title, value, icon, secondaryValue, trend }: {
  title: string;
  value: string;
  icon: React.ReactNode;
  secondaryValue?: string;
  trend?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <Card className="rounded-2xl shadow-sm bg-[#1A1F27] border border-[#2A2F3A] hover:border-[#00FFC6] transition-all">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-[#CFCFCF]">{title}</CardTitle>
        <div className="p-2 rounded-lg bg-[#2A2F38] ring-1 ring-[#353B45]">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-white">{value}</div>
          {secondaryValue && (
            <div className="text-sm text-[#9CA3AF]">{secondaryValue}</div>
          )}
          {trend !== undefined && (
            <div className={`flex items-center gap-1 text-sm ${trend >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {trend >= 0 ? <TrendingUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}
              <span>{Math.abs(trend).toFixed(2)}%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default function WalletStats({ stats }: Props) {
  const balanceUsd = formatUsd(stats.balance);
  const sentUsd = formatUsd(stats.totalSent);
  const receivedUsd = formatUsd(stats.totalReceived);
  
  // Calculate trends (this should ideally come from the backend)
  const sentTrend = stats.totalSent > 0 ? ((stats.totalSent - stats.totalReceived) / stats.totalSent) * 100 : 0;
  const receivedTrend = stats.totalReceived > 0 ? ((stats.totalReceived - stats.totalSent) / stats.totalReceived) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <StatCard
          title="Balance"
          value={`${formatEth(stats.balance)} ETH`}
          secondaryValue={balanceUsd}
          icon={<CoinsIcon className="h-5 w-5 text-[#00FFC6]" />}
        />
        <StatCard
          title="Total Sent"
          value={`${formatEth(stats.totalSent)} ETH`}
          secondaryValue={sentUsd}
          icon={<ArrowUpIcon className="h-5 w-5 text-rose-400" />}
          trend={sentTrend}
        />
        <StatCard
          title="Total Received"
          value={`${formatEth(stats.totalReceived)} ETH`}
          secondaryValue={receivedUsd}
          icon={<ArrowDownIcon className="h-5 w-5 text-emerald-400" />}
          trend={receivedTrend}
        />
        <StatCard
          title="Transactions Count"
          value={stats.totalTxCount.toLocaleString()}
          secondaryValue={`${formatEth(stats.totalFeeUsed)} ETH in fees`}
          icon={<WalletIcon className="h-5 w-5 text-[#00FFC6]" />}
        />
      </div>

      {stats.largestAmountTransaction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
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
                    {formatEth(stats.largestAmountTransaction.value)} ETH
                  </div>
                  <div className="text-sm text-[#9CA3AF]">{formatUsd(stats.largestAmountTransaction.value)}</div>
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
        </motion.div>
      )}
    </div>
  );
}