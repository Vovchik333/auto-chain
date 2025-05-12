import { TransactionDto } from "@/common/types/transaction.dto";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type Props = {
  transactions: TransactionDto[];
};

export default function TransactionTable({ transactions }: Props) {
  return (
    <div className="overflow-auto rounded-xl border border-[#2A2F3A] bg-[#1A1F27] shadow-sm">
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-[#232936]">
          <tr className="text-left font-medium text-[#CFCFCF]">
            <th className="px-4 py-3">Hash</th>
            <th className="px-4 py-3">From</th>
            <th className="px-4 py-3">To</th>
            <th className="px-4 py-3">Value (ETH)</th>
            <th className="px-4 py-3">Fee</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Category</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#2A2F3A]">
          {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-[#2C3440] transition">
                <td className="px-4 py-2">
                  <Link 
                    href={`/transactions/${tx.id}`}
                    className="text-[#00FFC6] hover:underline"
                  >
                    {tx.hash.slice(0, 10)}...
                  </Link>
                </td>
                <td className="px-4 py-2 text-[#E5E7EB]">{tx.from.slice(0, 10)}...</td>
                <td className="px-4 py-2 text-[#E5E7EB]">{tx.to.slice(0, 10)}...</td>
                <td className="px-4 py-2 text-white">{(tx.value / 1e18).toFixed(4)}</td>
                <td className="px-4 py-2 text-white">{(tx.txnFee / 1e18).toFixed(6)}</td>
                <td className="px-4 py-2">
                  <Badge
                    variant={
                      tx.status === "Success"
                        ? "default"
                        : tx.status === "Pending"
                        ? "secondary"
                        : "destructive"
                    }
                    className={
                      tx.status === "Success"
                        ? "bg-emerald-600 text-white"
                        : tx.status === "Pending"
                        ? "bg-yellow-500 text-white"
                        : "bg-rose-600 text-white"
                    }
                  >
                    {tx.status}
                  </Badge>
                </td>
                <td className="px-4 py-2 text-[#9CA3AF]">{new Date(tx.date).toLocaleString()}</td>
                <td className="px-4 py-2">
                  <Badge
                    variant="outline"
                    className={
                      tx.category === "income"
                        ? "bg-green-600 text-white"
                        : tx.category === "expense"
                        ? "bg-red-600 text-white"
                        : "border border-gray-500 text-[#CFCFCF]"
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