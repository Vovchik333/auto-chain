'use client'

import { FC, useEffect, useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useParams, useRouter } from 'next/navigation';
import { useTransactionStore } from '@/stores/transaction/transaction.store';
import { 
  ArrowLeft, 
  MoreVertical, 
  Copy, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  XCircle,
  ArrowUpRight,
  ArrowDownLeft,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const TransactionPage: FC = () => {
  const params = useParams();
  const router = useRouter();
  const transactionId = params.transactionId;
  const [copied, setCopied] = useState<string | null>(null);

  const { selectedTransaction, getTransactionById } = useTransactionStore();

  useEffect(() => {
    getTransactionById(transactionId as string);
  }, [transactionId, getTransactionById]);

  const handleCopy = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(field);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(null), 2000);
  };

  const formatEth = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 4,
      maximumFractionDigits: 8
    }).format(value);
  };

  const formatUsd = (ethValue: number) => {
    const ethPrice = 2000; // This should come from an API in production
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(ethValue * ethPrice);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'Pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <XCircle className="w-5 h-5 text-rose-500" />;
    }
  };

  const getStatusDescription = (status: string) => {
    switch (status) {
      case 'Success':
        return 'Transaction has been successfully confirmed and included in the blockchain';
      case 'Pending':
        return 'Transaction has been submitted and is waiting to be confirmed';
      case 'Failed':
        return 'Transaction failed to execute or was reverted';
      default:
        return 'Unknown transaction status';
    }
  };

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case 'income':
        return 'Incoming transaction - you received funds';
      case 'expense':
        return 'Outgoing transaction - you sent funds';
      default:
        return 'Transaction type';
    }
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
            <DropdownMenuItem onClick={() => handleCopy(selectedTransaction.hash, 'hash')}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Transaction Hash
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <Card className="border-[#2A2F3A] bg-[#1A1F27]">
          <CardHeader className="border-b border-[#2A2F3A] bg-[#232936] px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl ${
                  selectedTransaction.category === "income" ? "bg-emerald-500/10" : "bg-rose-500/10"
                }`}>
                  {selectedTransaction.category === "income" ? (
                    <ArrowDownLeft className="w-6 h-6 text-emerald-500" />
                  ) : (
                    <ArrowUpRight className="w-6 h-6 text-rose-500" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-2xl font-bold text-[#00FFC6]">
                      {formatEth(selectedTransaction.value)} ETH
                    </p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className={`p-1 rounded-full ${
                            selectedTransaction.category === "income" ? "bg-emerald-500/10" : "bg-rose-500/10"
                          }`}>
                            <HelpCircle className="w-4 h-4 text-[#A3A3A3]" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#2A2F38] border-[#353B45] text-[#F0F0F0]">
                          <p>{getCategoryDescription(selectedTransaction.category)}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-base text-[#A3A3A3]">{formatUsd(selectedTransaction.value)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge
                        variant="outline"
                        className={`
                          px-3 py-1.5 rounded-full font-medium text-sm
                          ${selectedTransaction.status === "Success"
                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                            : selectedTransaction.status === "Pending"
                            ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                            : "bg-rose-500/10 text-rose-500 border border-rose-500/20"}
                        `}
                      >
                        <span className="flex items-center gap-2">
                          {getStatusIcon(selectedTransaction.status)}
                          {selectedTransaction.status}
                        </span>
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#2A2F38] border-[#353B45] text-[#F0F0F0]">
                      <p>{getStatusDescription(selectedTransaction.status)}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge
                        variant="outline"
                        className={`
                          px-3 py-1.5 rounded-full font-medium text-sm capitalize
                          ${selectedTransaction.category === "income"
                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-500 border border-rose-500/20"}
                        `}
                      >
                        {selectedTransaction.category}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#2A2F38] border-[#353B45] text-[#F0F0F0]">
                      <p>{getCategoryDescription(selectedTransaction.category)}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#A3A3A3] mb-2 block">Transaction Hash</label>
                <div className="flex items-center justify-between bg-[#232936] p-3 rounded-lg border border-[#2A2F3A]">
                  <p className="font-mono text-sm text-[#F0F0F0]">{selectedTransaction.hash}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleCopy(selectedTransaction.hash, 'hash')}
                  >
                    {copied === 'hash' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-[#A3A3A3]" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-[#A3A3A3] mb-2 block">From</label>
                    <div className="flex items-center justify-between bg-[#232936] p-3 rounded-lg border border-[#2A2F3A]">
                      <p className="font-mono text-sm text-[#F0F0F0]">{selectedTransaction.from}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleCopy(selectedTransaction.from, 'from')}
                      >
                        {copied === 'from' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-[#A3A3A3]" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-[#A3A3A3] mb-2 block">To</label>
                    <div className="flex items-center justify-between bg-[#232936] p-3 rounded-lg border border-[#2A2F3A]">
                      <p className="font-mono text-sm text-[#F0F0F0]">{selectedTransaction.to}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleCopy(selectedTransaction.to, 'to')}
                      >
                        {copied === 'to' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-[#A3A3A3]" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-[#A3A3A3] mb-2 block">Transaction Fee</label>
                    <div className="bg-[#232936] p-3 rounded-lg border border-[#2A2F3A]">
                      <p className="font-semibold text-[#F0F0F0]">{formatEth(selectedTransaction.txnFee)} ETH</p>
                      <p className="text-sm text-[#A3A3A3]">{formatUsd(selectedTransaction.txnFee)}</p>
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
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TransactionPage;