'use client'

import { FC, useEffect } from 'react';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { useParams } from 'next/navigation';
import { useTransactionStore } from '@/stores/transaction/transaction.store';
import { ArrowLeft, MoreVertical } from 'lucide-react';
import Link from 'next/link';

const TransactionPage: FC = () => {
  const params = useParams();
  const transactionId = params.transactionId;

  const { selectedTransaction, getTransactionById } = useTransactionStore();

  useEffect(() => {
    getTransactionById(transactionId as string);
  }, []);

  if (!selectedTransaction) return <div>Loading...</div>;

  return (
    <div className="bg-[#1A1F27] text-[#F0F0F0]">
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center space-x-3 mb-4">
          <Link href="/transactions">
            <ArrowLeft className="h-5 w-5 text-[#A3A3A3] hover:text-[#00FFC6] transition-colors" />
          </Link>
          <div>
            <div className="text-lg font-semibold text-[#F0F0F0]">Transaction Details</div>
          </div>
        </div>
        <MoreVertical className="h-5 w-5 text-[#A3A3A3] hover:text-[#00FFC6] cursor-pointer transition-colors" />
      </div>
      <Card className="bg-[#2A2F38] text-[#F0F0F0] p-6 shadow-lg rounded-md">
        <CardContent className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Hash:</h2>
            <p className="text-[#A3A3A3]">{selectedTransaction.hash}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">From:</h3>
            <p>{selectedTransaction.from}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">To:</h3>
            <p>{selectedTransaction.to}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Value:</h3>
            <p className="text-[#00FFC6]">{selectedTransaction.value} ETH</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Transaction Fee:</h3>
            <p>{selectedTransaction.txnFee} ETH</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Date:</h3>
            <p>{format(new Date(selectedTransaction.date), 'MMM dd, yyyy')}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Status:</h3>
            <p className={`text-${selectedTransaction.status === 'Success' ? 'green' : 'red'}-600`}>
              {selectedTransaction.status}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Category:</h3>
            <p>{selectedTransaction.category}</p>
          </div>
          {/* <div>
            <h3 className="text-lg font-semibold">Wallet Address:</h3>
            <p>{selectedTransaction.walletAddress}</p>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionPage;