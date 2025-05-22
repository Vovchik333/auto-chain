"use client";

import Link from "next/link";
import { WalletDto } from "@/common/types/wallet/wallet.dto";
import { ActionsMenu } from "@/components/ActionsMenu";
import { Wallet, ArrowRight } from "lucide-react";

interface Props {
  wallet: WalletDto
}

const WalletPreview: React.FC<Props> = ({
  wallet,
}) => {
  const formattedBalance = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  }).format(wallet.statistics.balance);

  return (
    <Link href={`/wallets/${wallet.id}`}>
      <div 
        className="group relative flex flex-col sm:flex-row items-start gap-6 p-6 border border-[#2A2F3A] rounded-xl bg-[#1A1F27] hover:border-[#00FFC6] hover:shadow-lg transition-all duration-200"
      >
        <div className="flex items-start gap-4 w-full sm:w-auto">
          <div className="hidden md:block p-3 rounded-xl bg-[#2A2F38] text-[#00FFC6] ring-2 ring-[#2A2F38] group-hover:ring-[#00FFC6] transition-all">
            <Wallet className="w-6 h-6" />
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium text-[#F0F0F0] group-hover:text-[#00FFC6] transition-colors">
                {wallet.name || `Wallet ${wallet.id}`}
              </h3>
              <ArrowRight className="w-4 h-4 text-[#00FFC6] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="text-sm text-[#A3A3A3]">
                <span>{wallet.transactions.length} {wallet.transactions.length === 1 ? "transaction" : "transactions"}</span>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <code className="px-2 py-1 rounded-md bg-[#2A2F38] text-sm font-mono text-[#A3A3A3]">
                {wallet.address.slice(0, 8)}...{wallet.address.slice(-6)}
              </code>
              <button 
                className="text-xs text-[#00FFC6] hover:text-[#00FFC6]/80 transition-colors cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard.writeText(wallet.address);
                }}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6 mt-4 sm:mt-0 w-full sm:w-auto sm:ml-auto h-full">
          <div className="flex flex-col items-end flex-grow sm:flex-grow-0">
            <div className="flex items-center gap-2">
              <div className="text-lg font-semibold text-[#F0F0F0]">
                {formattedBalance} <span className="text-[#00FFC6]">ETH</span>
              </div>
            </div>
          </div>
          <ActionsMenu 
            onDelete={() => {}}
            onEdit={() => {}}
          />
        </div>
      </div>
    </Link>
  );
};

export default WalletPreview;
