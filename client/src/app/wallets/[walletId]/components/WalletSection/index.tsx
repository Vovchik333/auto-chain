'use client';

import { WalletDto } from '@/common/types/wallet/wallet.dto';
import TransactionTable from '@/components/TransactionTable';
import WalletStats from '@/components/WalletStats';
import { useTransactionStore } from '@/stores/transaction/transaction.store';
import { useEffect } from 'react';

type Props = {
  wallet: WalletDto;
};

export default function WalletSection({ wallet }: Props) {
  const { transactions, isLoading, loadTransactions } = useTransactionStore();

  useEffect(() => {
    loadTransactions({ walletId: wallet.id });
  }, [wallet.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <WalletStats filter={{ walletId: wallet.id }} />
      <TransactionTable transactions={transactions} walletId={wallet.id}/>
    </div>
  );
}