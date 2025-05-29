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
      className="bg-secondary/50 p-4 rounded-box-lg border border-border hover:border-primary transition-colors theme-transition"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-muted-foreground text-sm theme-transition">{t('from')}</span>
          <TruncatedText text={from} />
        </div>
        <ArrowRight className="w-5 h-5 text-primary theme-transition" />
        <div className="flex items-center space-x-2">
          <span className="text-muted-foreground text-sm theme-transition">{t('to')}</span>
          <TruncatedText text={to} />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground text-sm theme-transition">{t('amount')}</span>
        <span className="text-primary font-semibold theme-transition">
          {amount} ETH
        </span>
      </div>
    </div>
  );
};