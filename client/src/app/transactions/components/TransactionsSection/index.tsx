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
      className="space-y-6 p-6 bg-background shadow-lg theme-transition"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground theme-transition">
            {tableTitle}
          </h2>
          <p className="text-sm text-muted-foreground mt-1 theme-transition">
            {t('transactionCount', {
              count: transactions.length,
              plural: transactions.length !== 1 ? 'ї' : 'я'
            })}
          </p>
        </div>
      </div>
      <TransactionTable transactions={transactions} walletId={walletAddress as string} />
    </section>
  );
}