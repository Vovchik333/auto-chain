import React from 'react';
import { TransferDto } from '@/common/types/transfer-instruction.dto';
import { SuggestionItem } from '../SuggestionItem';
import { useTranslations } from 'next-intl';

interface Props {
  suggestions: TransferDto[];
}

export const SuggestionList: React.FC<Props> = ({ suggestions }) => {
  const t = useTranslations('suggestions');

  if (suggestions.length === 0) {
    return (
      <div className="text-center p-6 bg-secondary/50 rounded-md border border-border theme-transition">
        <p className="text-muted-foreground theme-transition">{t('noSuggestions')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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