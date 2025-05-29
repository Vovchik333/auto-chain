"use client";

import Link from "next/link";
import { WalletDto } from "@/common/types/wallet/wallet.dto";
import { ActionsMenu } from "@/components/ActionsMenu";
import { Wallet, ArrowRight } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslations } from 'next-intl';

interface Props {
  wallet: WalletDto
}

const WalletPreview: React.FC<Props> = ({
  wallet,
}) => {
  const t = useTranslations('wallet');
  return (
    <Link href={`/wallets/${wallet.id}`}>
      <div 
        className="group relative flex flex-col sm:flex-row items-start gap-6 p-6 border border-border rounded-xl bg-background hover:border-primary hover:shadow-lg transition-all duration-200 theme-transition"
      >
        <div className="flex items-start gap-4 w-full sm:w-auto">
          <div className="hidden md:block p-3 rounded-xl bg-secondary text-primary ring-2 ring-border group-hover:ring-primary transition-all theme-transition">
            <Wallet className="w-6 h-6" />
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors theme-transition">
                {wallet.name || t('preview.defaultName', { id: wallet.id })}
              </h3>
              <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            {/* <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="text-sm text-[#A3A3A3]">
                <span>{t('preview.transactionCount', { count: wallet.transactions.length })}</span>
              </div>
            </div> */}
            {wallet.address && (
              <div className="mt-2 flex items-center gap-2">
                <code className="px-2 py-1 rounded-md bg-secondary text-sm font-mono text-muted-foreground theme-transition">
                  {wallet.address.slice(0, 8)}...{wallet.address.slice(-6)}
                </code>
                <CopyButton 
                  text={wallet.address}
                  isPreventDefault
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-6 mt-4 sm:mt-0 w-full sm:w-auto sm:ml-auto h-full">
          {/* <div className="flex flex-col items-end flex-grow sm:flex-grow-0">
            <div className="flex items-center gap-2">
              <div className="text-lg font-semibold text-[#F0F0F0]">
                {formattedBalance} <span className="text-[#00FFC6]">ETH</span>
              </div>
            </div>
          </div> */}
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
