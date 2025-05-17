'use client';

import { WalletDto } from '@/common/types/wallet/wallet.dto';
import TransactionTable from '@/components/TransactionTable';
import WalletStats from '@/components/WalletStats';

type Props = {
  wallet: WalletDto;
};

export default function WalletSection({ wallet }: Props) {
  return (
    <div className="space-y-4">
      <WalletStats stats={wallet.statistics} />
      <TransactionTable transactions={wallet.transactions} />
    </div>
  );
}