import React from 'react';

interface Props {
  from: string;
  to: string;
  amount: number;
}

export const SuggestionItem: React.FC<Props> = ({ from, to, amount }) => {
  return (
    <div className="p-4 bg-[#1A1F27] rounded-xl border border-[#2A2F38] flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div className="text-sm break-all text-[#F0F0F0]">
        <div>
          <strong className="text-[#A3A3A3]">From:</strong>{' '}
          <span>{from}</span>
        </div>
        <div>
          <strong className="text-[#A3A3A3]">To:</strong>{' '}
          <span>{to}</span>
        </div>
      </div>
      <div className="mt-2 sm:mt-0 sm:text-right font-mono text-sm text-[#00FFC6]">
        {amount.toFixed(8)} ETH
      </div>
    </div>
  );
};