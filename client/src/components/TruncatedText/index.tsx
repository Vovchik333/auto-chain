'use client'

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type Props = { 
  text: string;
  className?: string;
}

export const TruncatedText: React.FC<Props> = ({ text, className }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text.length > 12;

  if (!shouldTruncate) {
    return <span className={cn("text-foreground font-medium theme-transition", className)}>{text}</span>;
  }

  return (
    <div className="flex items-center gap-1">
      <span className={cn("text-foreground font-medium theme-transition", className)}>
        {isExpanded ? text : `${text.slice(0, 6)}...${text.slice(-4)}`}
      </span>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-1 hover:bg-secondary rounded transition-all theme-transition group"
        title={isExpanded ? "Show less" : "Show more"}
      >
        {isExpanded ? (
          <EyeOff className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors cursor-pointer theme-transition" />
        ) : (
          <Eye className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors cursor-pointer theme-transition" />
        )}
      </button>
    </div>
  );
};