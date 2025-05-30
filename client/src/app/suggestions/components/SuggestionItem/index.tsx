import { TruncatedText } from '@/components/TruncatedText';
import React from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

interface Props {
  from: string;
  to: string;
  amount: number;
}

export const SuggestionItem: React.FC<Props> = ({ from, to, amount }) => {
  const t = useTranslations('suggestions.transfers');

  return (
    <div
      className="bg-secondary/50 p-6 rounded-md border border-border hover:border-primary transition-all theme-transition"
    >
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground text-sm theme-transition">{t('from')}:</span>
          <TruncatedText text={from} className="text-foreground theme-transition" />
        </div>
        <ArrowRight className="w-5 h-5 text-primary shrink-0 theme-transition" />
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground text-sm theme-transition">{t('to')}:</span>
          <TruncatedText text={to} className="text-foreground theme-transition" />
        </div>
      </div>
      <div className="flex justify-between items-center gap-3">
        <span className="text-muted-foreground text-sm theme-transition">{t('amount')}:</span>
        <span className="text-primary font-medium theme-transition">
          {amount} ETH
        </span>
      </div>
    </div>
  );
};