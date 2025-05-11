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
      <div className="flex items-center justify-between p-4 border border-[#2A2F3A] rounded-xl bg-[#1A1F27] hover:shadow-lg transition duration-200">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-[#00FFC6] font-medium hover:underline">{name}</div>
            <div className="text-sm text-[#A3A3A3]">
              <span className="text-[#00FFC6] hover:underline">
                {transactions} {transactions === 1 ? "transaction" : "transactions"}
              </span>{" "}
              • {lastSynced}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-[#2A2F38] rounded px-3 py-1 text-[#F0F0F0] text-sm font-medium flex gap-1 flex-col min-w-[200px]">
            <div>Total:</div>
            <div>{totalValue.toFixed(6)} ETH</div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-[#2C3440] rounded-full p-2 transition-colors cursor-pointer"
          >
            <MoreVertical className="h-5 w-5 text-[#A3A3A3] hover:text-[#00FFC6] transition-colors" />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default WalletPreview;
