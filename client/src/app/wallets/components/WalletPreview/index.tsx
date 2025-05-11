"use client";

import { MoreVertical } from "lucide-react";
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
      <div className="flex items-center justify-between p-4 border rounded-lg bg-[#1A1F27] hover:shadow-lg transition duration-200">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-[#00FFC6] font-medium cursor-pointer hover:underline">{name}</div>
            <div className="text-sm text-[#A3A3A3]">
              <span className="text-[#00FFC6] hover:underline cursor-pointer">
                {transactions} {transactions === 1 ? "transaction" : "transactions"}
              </span>{" "}
              • {lastSynced}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-[#2A2F38] rounded px-3 py-1 text-[#F0F0F0] text-sm font-medium flex gap-1 flex-col">
            <div>Total:</div>
            <div>{totalValue}</div>
          </div>
          <Button variant="ghost" size="icon" className="text-[#A3A3A3] hover:text-[#F0F0F0]">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default WalletPreview;
