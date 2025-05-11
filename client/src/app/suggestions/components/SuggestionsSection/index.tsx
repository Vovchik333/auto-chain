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
      <div className="bg-muted p-4 rounded-2xl border text-sm sm:text-base">
        <p>
          <span className="font-medium text-muted-foreground">Загальна сума:</span>{' '}
          {total} ETH 
        </p>
        <p>
          <span className="font-medium text-muted-foreground">Цільова сума для кожного гаманця:</span>{' '}
          {target} ETH
        </p>
      </div>
      <SuggestionList suggestions={transfers} />
    </>
  );
};