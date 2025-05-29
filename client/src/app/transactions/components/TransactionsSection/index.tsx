import { TransactionDto } from "@/common/types/transaction/transaction.dto";
import TransactionTable from "../../../../components/TransactionTable";
import { useTranslations } from 'next-intl';

type Props = {
  tableTitle: string;
  transactions: TransactionDto[];
  walletAddress?: string;
};

export default function TransactionsSection({ 
  tableTitle,
  transactions,
  walletAddress
}: Props) {
  const t = useTranslations('transaction');

  return (
    <section 
      className="space-y-6 p-6 bg-[#1A1F27] rounded-lg border border-[#2A2F38] shadow-lg"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#F0F0F0]">
            {tableTitle}
          </h2>
          <p className="text-sm text-[#A3A3A3] mt-1">
            {t('transactionCount', {
              count: transactions.length,
              plural: transactions.length !== 1 ? 'ї' : 'я'
            })}
          </p>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border border-[#2A2F38]">
        <TransactionTable transactions={transactions} walletId={walletAddress as string} />
      </div>
    </section>
  );
}