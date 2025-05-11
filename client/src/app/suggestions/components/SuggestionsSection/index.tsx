import React from 'react';
import { DiversificationDto } from '@/common/types/diversification.dto';
import { SuggestionList } from '../SuggestionList';

interface Props {
  diversification: DiversificationDto;
}

export const SuggestionsSection: React.FC<Props> = ({ diversification }) => {
  const { transfers, total, target } = diversification;

  return (
    <>
      <div className="bg-[#2A2F38] p-4 rounded-2xl border border-[#1A1F27] text-sm sm:text-base text-[#F0F0F0] mb-4">
        <p className="mb-2">
          <span className="font-medium text-[#A3A3A3]">Total amount:</span>{' '}
          <span className="text-[#00FFC6]">{total} ETH</span>
        </p>
        <p>
          <span className="font-medium text-[#A3A3A3]">Target amount for each wallet:</span>{' '}
          <span className="text-[#00FFC6]">{target} ETH</span>
        </p>
      </div>
      <h2 className="text-xl font-semibold text-[#F0F0F0] mb-4">
        Necessary transfers
      </h2>
      <SuggestionList suggestions={transfers} />
    </>
  );
};