"use client";

import Link from "next/link";
import { WalletDto } from "@/common/types/wallet/wallet.dto";
import { ActionsMenu } from "@/components/ActionsMenu";

interface Props {
  wallet: WalletDto
}

const WalletPreview: React.FC<Props> = ({
  wallet,
}) => {
  return (
    <Link href={`/wallets/${wallet.id}`}>
      <div className="flex items-center justify-between p-4 border border-[#2A2F3A] rounded-xl bg-[#1A1F27] hover:shadow-lg transition duration-200">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-[#00FFC6] font-medium hover:underline">{wallet.name}</div>
            <div className="text-sm text-[#A3A3A3]">
              <span className="text-[#00FFC6] hover:underline">
                {wallet.transactions.length} {wallet.transactions.length === 1 ? "transaction" : "transactions"}
              </span>
              {wallet.transactions.length !== 0 && (
                <>{` • ${new Date(wallet.transactions[0].date).toLocaleString()}`}</>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-[#2A2F38] rounded px-3 py-1 text-[#F0F0F0] text-sm font-medium flex gap-1 flex-col min-w-[200px]">
            <div>Total:</div>
            <div>{wallet.statistics.balance} ETH</div>
          </div>
          <ActionsMenu 
            onDelete={() => {}}
            onEdit={()=> {}}
          />
        </div>
      </div>
    </Link>
  );
};

export default WalletPreview;
