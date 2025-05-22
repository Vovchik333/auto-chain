'use client'

import { FC, useEffect, useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useParams } from 'next/navigation';
import { useTransactionStore } from '@/stores/transaction/transaction.store';
import { 
  ArrowLeft, 
  MoreVertical, 
  Copy, 
  ExternalLink, 
  CheckCircle2, 
} from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { SecondaryButton } from '@/components/SecondaryButton';
import { CopyButton } from '@/components/CopyButton';

const TransactionPage: FC = () => {
  const params = useParams();
  const transactionId = params.transactionId;

  const { selectedTransaction, getTransactionById } = useTransactionStore();

  useEffect(() => {
    getTransactionById(transactionId as string);
  }, [transactionId, getTransactionById]);

  const formatEth = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 4,
      maximumFractionDigits: 8
    }).format(value);
  };

  if (!selectedTransaction) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="flex items-center space-x-3 mb-6">
          <Link href="/transactions">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-5 w-5 text-[#A3A3A3]" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold text-[#F0F0F0]">Transaction Details</h1>
        </div>
        
        <div className="space-y-6">
          <Card className="border-[#2A2F3A] bg-[#1A1F27]">
            <CardHeader className="border-b border-[#2A2F3A] bg-[#232936]">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-8 rounded-full bg-[#353B45]" />
                <Skeleton className="h-6 w-32 bg-[#353B45]" />
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <Skeleton className="h-6 w-3/4 bg-[#353B45]" />
              <Skeleton className="h-6 w-1/2 bg-[#353B45]" />
              <Skeleton className="h-6 w-2/3 bg-[#353B45]" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-24 bg-[#353B45]" />
                <Skeleton className="h-24 bg-[#353B45]" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Link href="/transactions">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-5 w-5 text-[#A3A3A3]" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-[#F0F0F0]">Transaction Details</h1>
            <p className="text-sm text-[#A3A3A3]">
              {formatDistanceToNow(new Date(selectedTransaction.date), { addSuffix: true })}
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <MoreVertical className="h-5 w-5 text-[#A3A3A3]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#2A2F38] border-[#353B45]">
            <DropdownMenuItem onClick={() => window.open(`https://etherscan.io/tx/${selectedTransaction.hash}`, '_blank')}>
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Etherscan
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Transaction Hash
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div
        className="space-y-6"
      >
        <Card className="border-[#2A2F3A] bg-[#1A1F27]">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#A3A3A3] mb-2 block">Value</label>
                <div className="flex items-center justify-between bg-[#232936] p-3 rounded-lg border border-[#2A2F3A]">
                  <p className="font-mono text-sm text-[#F0F0F0]">
                    {formatEth(selectedTransaction.value)} ETH
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#A3A3A3] mb-2 block">Transaction Hash</label>
                <div className="flex items-center justify-between bg-[#232936] p-3 rounded-lg border border-[#2A2F3A]">
                  <p className="font-mono text-sm text-[#F0F0F0]">{selectedTransaction.hash}</p>
                  <CopyButton text={selectedTransaction.hash} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-[#A3A3A3] mb-2 block">From</label>
                    <div className="flex items-center justify-between bg-[#232936] p-3 rounded-lg border border-[#2A2F3A] gap-2">
                      <p className="font-mono text-sm text-[#F0F0F0]">{selectedTransaction.from}</p>
                      <CopyButton text={selectedTransaction.from} />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-[#A3A3A3] mb-2 block">To</label>
                    <div className="flex items-center justify-between bg-[#232936] p-3 rounded-lg border border-[#2A2F3A] gap-2">
                      <p className="font-mono text-sm text-[#F0F0F0]">{selectedTransaction.to}</p>
                      <CopyButton text={selectedTransaction.to} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-[#A3A3A3] mb-2 block">Transaction Fee</label>
                    <div className="bg-[#232936] p-3 rounded-lg border border-[#2A2F3A]">
                      <p className="font-semibold text-[#F0F0F0]">{formatEth(selectedTransaction.txnFee)} ETH</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-[#A3A3A3] mb-2 block">Date & Time</label>
                    <div className="bg-[#232936] p-3 rounded-lg border border-[#2A2F3A]">
                      <p className="font-semibold text-[#F0F0F0]">
                        {format(new Date(selectedTransaction.date), 'MMMM dd, yyyy')}
                      </p>
                      <p className="text-sm text-[#A3A3A3]">
                        {format(new Date(selectedTransaction.date), 'HH:mm:ss')} UTC
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-[#A3A3A3] mb-2 block">Status</label>
                    <div className="bg-[#232936] p-3 rounded-lg border border-[#2A2F3A]">
                      <p className="flex gap-2 font-semibold text-[#F0F0F0]">
                        {selectedTransaction.status}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#A3A3A3] mb-2 block">Type</label>
                    <div className="bg-[#232936] p-3 rounded-lg border border-[#2A2F3A]">
                      <p className="flex gap-2 font-semibold text-[#F0F0F0]">
                      {selectedTransaction.category}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionPage;