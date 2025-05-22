import React from 'react';
import { DiversificationDto } from '@/common/types/diversification.dto';
import { SuggestionList } from '../SuggestionList';
import { Wallet } from 'lucide-react';
import { WalletDto } from '@/common/types/wallet/wallet.dto';
import { TruncatedText } from '@/components/TruncatedText';

interface Props {
  diversification: DiversificationDto;
  wallets: WalletDto[];
}

export const SuggestionsSection: React.FC<Props> = ({ diversification, wallets }) => {
  const { transfers, total, target } = diversification;

  const involvedWallets = wallets.filter(wallet => 
    transfers.some(t => t.from === wallet.address || t.to === wallet.address)
  );

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <div className="bg-[#2A2F38] p-6 rounded-2xl border border-[#1A1F27] flex flex-col">
          <span className="text-[#A3A3A3] text-sm mb-2">Total amount</span>
          <span className="text-[#00FFC6] text-2xl font-semibold">{total} ETH</span>
        </div>
        <div className="bg-[#2A2F38] p-6 rounded-2xl border border-[#1A1F27] flex flex-col">
          <span className="text-[#A3A3A3] text-sm mb-2">Target per wallet</span>
          <span className="text-[#00FFC6] text-2xl font-semibold">{target} ETH</span>
        </div>
      </div>

      <div className="bg-[#2A2F38] rounded-2xl border border-[#1A1F27] p-6 mb-6">
        <h2 className="text-xl font-semibold text-[#F0F0F0] mb-4 flex items-center">
          <Wallet className="w-5 h-5 mr-2 text-[#00FFC6]" />
          Participating Wallets
        </h2>
        <div className="grid gap-3">
          {involvedWallets.map((wallet, index) => (
            <div
              key={wallet.id}
              className="bg-[#1A1F27] p-4 rounded-xl border border-[#353B43] flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#00FFC6]/10 flex items-center justify-center">
                  <span className="text-[#00FFC6] font-medium">{index + 1}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[#F0F0F0] font-medium text-sm">{wallet.name}</span>
                  <TruncatedText text={wallet.address} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-end gap-3">
                  <span className="text-[#A3A3A3] text-xs">Current Balance</span>
                  <span className="text-[#00FFC6] font-semibold">
                    {wallet.statistics.balance} ETH
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#2A2F38] rounded-2xl border border-[#1A1F27] p-6">
        <h2 className="text-xl font-semibold text-[#F0F0F0] mb-6 flex items-center">
          <svg 
            className="w-5 h-5 mr-2 text-[#00FFC6]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" 
            />
          </svg>
          Recommended Transfers
        </h2>
        <SuggestionList suggestions={transfers} />
      </div>
    </div>
  );
};