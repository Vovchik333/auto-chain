'use client';

import { WalletDto } from '@/common/types/wallet.dto';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowDownIcon, ArrowUpIcon, WalletIcon, CoinsIcon } from 'lucide-react';

type Props = {
  wallet: WalletDto;
};

export default function WalletStats({ wallet }: Props) {
  return (
    <div key={wallet.id} className="space-y-4">
      <h2 className="text-xl font-bold">Wallet: <span className="text-muted-foreground">{wallet.address}</span></h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
            <ArrowUpIcon className="h-5 w-5 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wallet.statistics.totalSent} ETH</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Received</CardTitle>
            <ArrowDownIcon className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wallet.statistics.totalReceived} ETH</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions Count</CardTitle>
            <WalletIcon className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wallet.statistics.totalTxCount}</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fee Used</CardTitle>
            <CoinsIcon className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wallet.statistics.totalFeeUsed} ETH</div>
          </CardContent>
        </Card>

        <Card className="col-span-full rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Largest Transaction</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-1">
            <div>Hash: <code className="break-all">{wallet.statistics.largestAmountTransaction.hash}</code></div>
            <div>Amount: <span className="font-medium">{wallet.statistics.largestAmountTransaction.value} ETH</span></div>
            <div>From: {wallet.statistics.largestAmountTransaction.from}</div>
            <div>To: {wallet.statistics.largestAmountTransaction.to}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}