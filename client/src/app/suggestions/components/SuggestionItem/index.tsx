import React from 'react';

interface Props {
  from: string;
  to: string;
  amount: number;
}

export const SuggestionItem: React.FC<Props> = ({ from, to, amount }) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div className="text-sm break-all">
        <div><strong>From:</strong> {from}</div>
        <div><strong>To:</strong> {to}</div>
      </div>
      <div className="mt-2 sm:mt-0 sm:text-right font-mono text-sm text-blue-600">
        {amount.toFixed(8)} ETH
      </div>
    </div>
  );
};