'use client'

import { FC, useEffect } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { useParams } from 'next/navigation';
import { useTransactionStore } from '@/stores/transaction/transaction.store';
import { 
  ArrowLeft, 
  MoreVertical, 
  Copy, 
  ExternalLink, 
} from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/CopyButton';
import { formatStringNumber } from '@/lib/string.utils';
import { useTranslations } from 'next-intl';

const TransactionPage: FC = () => {
  const t = useTranslations('transaction.details');
  const params = useParams();
  const transactionId = params.transactionId;

  const { selectedTransaction, getTransactionById } = useTransactionStore();

  useEffect(() => {
    getTransactionById(transactionId as string);
  }, [transactionId, getTransactionById]);

  if (!selectedTransaction) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="flex items-center space-x-3 mb-6">
          <Link href="/transactions">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-5 w-5 text-muted-foreground theme-transition" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold text-foreground theme-transition">{t('title')}</h1>
        </div>
        
        <div className="space-y-6">
          <Card className="border-border shadow-lg theme-transition">
            <CardContent className="p-6">
              <div className="space-y-6">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Skeleton className="h-24" />
                  <Skeleton className="h-24" />
                </div>
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
              <ArrowLeft className="h-5 w-5 text-muted-foreground theme-transition" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-foreground theme-transition">{t('title')}</h1>
            <p className="text-sm text-muted-foreground theme-transition">
              {formatDistanceToNow(new Date(selectedTransaction.date), { addSuffix: true })}
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <MoreVertical className="h-5 w-5 text-muted-foreground theme-transition" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => window.open(`https://etherscan.io/tx/${selectedTransaction.hash}`, '_blank')}>
              <ExternalLink className="w-4 h-4 mr-2" />
              {t('viewOnEtherscan')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>
              <Copy className="w-4 h-4 mr-2" />
              {t('copyHash')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-6">
        <Card className="border-border shadow-lg theme-transition">
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-full">
                <label className="text-sm font-medium text-muted-foreground mb-2 block theme-transition">{t('hash')}</label>
                <div className="flex items-center justify-between bg-secondary/50 p-3 rounded-md border border-border gap-2 theme-transition">
                  <p className="font-mono text-sm text-foreground theme-transition">{selectedTransaction.hash}</p>
                  <CopyButton text={selectedTransaction.hash} />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block theme-transition">{t('from')}</label>
                <div className="flex items-center justify-between bg-secondary/50 p-3 rounded-md border border-border gap-2 theme-transition">
                  <p className="font-mono text-sm text-foreground theme-transition">{selectedTransaction.from}</p>
                  <CopyButton text={selectedTransaction.from} />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block theme-transition">{t('to')}</label>
                <div className="flex items-center justify-between bg-secondary/50 p-3 rounded-md border border-border gap-2 theme-transition">
                  <p className="font-mono text-sm text-foreground theme-transition">{selectedTransaction.to}</p>
                  <CopyButton text={selectedTransaction.to} />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block theme-transition">{t('value')}</label>
                <div className="bg-secondary/50 p-3 rounded-md border border-border theme-transition">
                  <p className="text-foreground font-medium theme-transition">
                    {formatStringNumber(selectedTransaction.value)} ETH
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block theme-transition">{t('fee')}</label>
                <div className="bg-secondary/50 p-3 rounded-md border border-border theme-transition">
                  <p className="text-foreground font-medium theme-transition">
                    {formatStringNumber(selectedTransaction.txnFee)} ETH
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block theme-transition">{t('status')}</label>
                <div className="bg-secondary/50 p-3 rounded-md border border-border theme-transition">
                  <p className="text-foreground font-medium theme-transition capitalize">
                    {selectedTransaction.status}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block theme-transition">{t('date')}</label>
                <div className="bg-secondary/50 p-3 rounded-md border border-border theme-transition">
                  <p className="text-foreground theme-transition">
                    {format(new Date(selectedTransaction.date), 'PPpp')}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block theme-transition">{t('type')}</label>
                <div className="bg-secondary/50 p-3 rounded-md border border-border theme-transition">
                  <p className="text-foreground font-medium theme-transition capitalize">
                    {selectedTransaction.type}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block theme-transition">{t('category')}</label>
                <div className="bg-secondary/50 p-3 rounded-md border border-border theme-transition">
                  <p className="text-foreground font-medium theme-transition capitalize">
                    {selectedTransaction.category}
                  </p>
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