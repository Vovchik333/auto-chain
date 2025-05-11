'use client';

import { WalletDto } from '@/common/types/wallet.dto';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowDownIcon, ArrowUpIcon, WalletIcon, CoinsIcon } from 'lucide-react';
import TransactionTable from '../TransactionTable';

type Props = {
  wallet: WalletDto;
};

export default function WalletStats({ wallet }: Props) {
  return (
    <div key={wallet.id} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Card className="rounded-2xl shadow-sm bg-[#1A1F27] border border-[#2A2F3A]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#CFCFCF]">Total Sent</CardTitle>
            <ArrowUpIcon className="h-5 w-5 text-rose-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{wallet.statistics.totalSent} ETH</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm bg-[#1A1F27] border border-[#2A2F3A]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#CFCFCF]">Total Received</CardTitle>
            <ArrowDownIcon className="h-5 w-5 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{wallet.statistics.totalReceived} ETH</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm bg-[#1A1F27] border border-[#2A2F3A]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#CFCFCF]">Transactions Count</CardTitle>
            <WalletIcon className="h-5 w-5 text-[#00FFC6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{wallet.statistics.totalTxCount}</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm bg-[#1A1F27] border border-[#2A2F3A]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#CFCFCF]">Total Fee Used</CardTitle>
            <CoinsIcon className="h-5 w-5 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{wallet.statistics.totalFeeUsed} ETH</div>
          </CardContent>
        </Card>

        <Card className="col-span-full rounded-2xl shadow-sm bg-[#1A1F27] border border-[#2A2F3A]">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-[#CFCFCF]">Largest Transaction</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-[#9CA3AF] space-y-1">
            <div>Hash: <code className="break-all text-[#E5E7EB]">{wallet.statistics.largestAmountTransaction.hash}</code></div>
            <div>Amount: <span className="font-medium text-white">{wallet.statistics.largestAmountTransaction.value} ETH</span></div>
            <div>From: <span className="text-[#D1D5DB]">{wallet.statistics.largestAmountTransaction.from}</span></div>
            <div>To: <span className="text-[#D1D5DB]">{wallet.statistics.largestAmountTransaction.to}</span></div>
          </CardContent>
        </Card>
      </div>
      <TransactionTable transactions={wallet.transactions} />
    </div>
  );
}