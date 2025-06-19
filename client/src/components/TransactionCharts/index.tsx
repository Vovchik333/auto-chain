'use client';

import React from 'react';
import { TransactionDto } from '@/common/types/transaction/transaction.dto';
import CategoryChart from './CategoryChart';
import MonthlyVolumeChart from './MonthlyVolumeChart';
import TransactionDistributionChart from './TransactionDistributionChart';

interface TransactionChartsProps {
  transactions: TransactionDto[];
}

const TransactionCharts: React.FC<TransactionChartsProps> = ({ transactions }) => {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      <div className="lg:col-span-2 xl:col-span-1">
        <CategoryChart transactions={transactions} />
      </div>
      <div className="lg:col-span-2 xl:col-span-1">
        <MonthlyVolumeChart transactions={transactions} />
      </div>
      <div className="lg:col-span-2 xl:col-span-1">
        <TransactionDistributionChart transactions={transactions} />
      </div>
    </div>
  );
};

export default TransactionCharts; 