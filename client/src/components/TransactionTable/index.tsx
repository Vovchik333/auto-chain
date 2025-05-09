import { TransactionDto } from "@/common/types/transaction.dto";
import { Badge } from "@/components/ui/badge";

type Props = {
  transactions: TransactionDto[];
};

export default function TransactionTable({ transactions }: Props) {
  return (
    <div className="overflow-auto rounded-lg border shadow-sm">
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr className="text-left font-medium text-gray-700 dark:text-gray-200">
            <th className="px-4 py-2">Hash</th>
            <th className="px-4 py-2">From</th>
            <th className="px-4 py-2">To</th>
            <th className="px-4 py-2">Value (ETH)</th>
            <th className="px-4 py-2">Fee</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Method</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Category</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {transactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
              <td className="px-4 py-2">
                <a
                  href={`https://etherscan.io/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 underline"
                >
                  {tx.hash.slice(0, 10)}...
                </a>
              </td>
              <td className="px-4 py-2">{tx.from.slice(0, 10)}...</td>
              <td className="px-4 py-2">{tx.to.slice(0, 10)}...</td>
              <td className="px-4 py-2">{(tx.value / 1e18).toFixed(4)}</td>
              <td className="px-4 py-2">{(tx.txnFee / 1e18).toFixed(6)}</td>
              <td className="px-4 py-2">
                <Badge
                  variant={
                    tx.status === "Success"
                      ? "default"
                      : tx.status === "Pending"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {tx.status}
                </Badge>
              </td>
              <td className="px-4 py-2">{tx.method}</td>
              <td className="px-4 py-2">{new Date(tx.date).toLocaleString()}</td>
              <td className="px-4 py-2">
                <Badge
                  variant={
                    tx.category === "income"
                      ? "default"
                      : tx.category === "expense"
                      ? "destructive"
                      : "outline"
                  }
                  className={
                    tx.category === "income"
                      ? "bg-green-600 text-white"
                      : tx.category === "expense"
                      ? "bg-red-600 text-white"
                      : ""
                  }
                >
                  {tx.category}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}