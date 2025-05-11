import React from 'react';
import { SuggestionItem } from '../SuggestionItem';
import { TransferInstruction } from '@/common/types/transfer-instruction.dto';

interface Props {
  suggestions: TransferInstruction[];
}

export const SuggestionList: React.FC<Props> = ({ suggestions }) => {
  return (
    <div className="space-y-2">
      {suggestions.map((sug, idx) => (
        <SuggestionItem key={idx} {...sug} />
      ))}
    </div>
  );
};