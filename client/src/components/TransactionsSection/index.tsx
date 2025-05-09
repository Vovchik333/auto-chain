import { TransactionDto } from "@/common/types/transaction.dto";
import TransactionTable from "../TransactionTable";
import ExportToCSVButton from "../ExportToCSVButton";

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
  return (
    <section className="space-y-6 py-4">
      <div className="flex justify-between gap-4 py-2">
        <h2 className="text-xl font-semibold">{tableTitle}</h2>
        <ExportToCSVButton address={walletAddress as string} />
      </div>
      <TransactionTable transactions={transactions} />
    </section>
  );
}