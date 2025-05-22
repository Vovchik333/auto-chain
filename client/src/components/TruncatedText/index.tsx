'use client'

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

type Props = { text: string }

export const TruncatedText: React.FC<Props> = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text.length > 12;

  if (!shouldTruncate) {
    return <span className="text-[#F0F0F0] font-medium">{text}</span>;
  }

  return (
    <div className="flex items-center gap-1">
      <span className="text-[#F0F0F0] font-medium">
        {isExpanded ? text : `${text.slice(0, 6)}...${text.slice(-4)}`}
      </span>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-1 hover:bg-[#2A2F38] rounded transition-colors group"
        title={isExpanded ? "Show less" : "Show more"}
      >
        {isExpanded ? (
          <EyeOff className="w-4 h-4 text-[#A3A3A3] group-hover:text-[#00FFC6] transition-colors cursor-pointer" />
        ) : (
          <Eye className="w-4 h-4 text-[#A3A3A3] group-hover:text-[#00FFC6] transition-colors cursor-pointer" />
        )}
      </button>
    </div>
  );
};