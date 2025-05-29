import { TruncatedText } from '@/components/TruncatedText';
import React from 'react';
import { useTranslations } from 'next-intl';

interface Props {
  from: string;
  to: string;
  amount: number;
}

export const SuggestionItem: React.FC<Props> = ({ from, to, amount }) => {
  const t = useTranslations('suggestions.transfers');

  return (
    <div
      className="bg-[#1A1F27] p-4 rounded-xl border border-[#353B43] hover:border-[#00FFC6] transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-[#A3A3A3] text-sm">{t('from')}</span>
          <TruncatedText text={from} />
        </div>
        <svg 
          className="w-5 h-5 text-[#00FFC6]" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M17 8l4 4m0 0l-4 4m4-4H3" 
          />
        </svg>
        <div className="flex items-center space-x-2">
          <span className="text-[#A3A3A3] text-sm">{t('to')}</span>
          <TruncatedText text={to} />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[#A3A3A3] text-sm">{t('amount')}</span>
        <span className="text-[#00FFC6] font-semibold">
          {amount} ETH
        </span>
      </div>
    </div>
  );
};