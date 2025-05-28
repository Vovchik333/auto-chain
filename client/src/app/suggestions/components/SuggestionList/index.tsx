import React from 'react';
import { TransferDto } from '@/common/types/transfer-instruction.dto';
import { SuggestionItem } from '../SuggestionItem';

interface Props {
  suggestions: TransferDto[];
}

export const SuggestionList: React.FC<Props> = ({ suggestions }) => {
  return (
    <div className="space-y-4">
      {suggestions.map((suggestion, idx) => (
        <SuggestionItem
          key={`${suggestion.from}-${suggestion.to}-${idx}`}
          from={suggestion.from}
          to={suggestion.to}
          amount={suggestion.amount}
        />
      ))}
    </div>
  );
};