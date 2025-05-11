"use client";

import { MoreVertical, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  id: string;
  name: string;
  transactions: number;
  lastSynced: string;
  totalValue: number;
}

const WalletPreview: React.FC<Props> = ({
  id,
  name,
  transactions,
  lastSynced,
  totalValue,
}) => {
  return (
    <Link href={`/wallets/${id}`}>
      <div className="flex items-center justify-between p-4 border rounded-lg bg-white hover:shadow-sm transition">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-blue-600 font-medium cursor-pointer hover:underline">{name}</div>
            <div className="text-sm text-gray-500">
              <span className="text-blue-600 hover:underline cursor-pointer">
                {transactions} {transactions === 1 ? "transaction" : "transactions"}
              </span>{" "}
              • {lastSynced}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-gray-100 rounded px-3 py-1 text-gray-800 text-sm font-medium flex gap-1 flex-col">
            <div>Total:</div>
            <div>{totalValue}</div>
          </div>

          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default WalletPreview;
