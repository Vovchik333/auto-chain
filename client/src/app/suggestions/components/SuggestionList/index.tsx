import React, { useState } from 'react';
import { TransferInstruction } from '@/common/types/transfer-instruction.dto';
import { Eye, EyeOff } from 'lucide-react';

interface Props {
  suggestions: TransferInstruction[];
}

export const TruncatedText: React.FC<{ text: string }> = ({ text }) => {
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

export const SuggestionList: React.FC<Props> = ({ suggestions }) => {
  return (
    <div className="space-y-4">
      {suggestions.map((suggestion, index) => (
        <div
          key={`${suggestion.from}-${suggestion.to}`}
          className="bg-[#1A1F27] p-4 rounded-xl border border-[#353B43] hover:border-[#00FFC6] transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-[#A3A3A3] text-sm">From</span>
              <TruncatedText text={suggestion.from} />
            </div>
            <svg 
              className="w-5 h-5 text-[#00FFC6]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
            <div className="flex items-center space-x-2">
              <span className="text-[#A3A3A3] text-sm">To</span>
              <TruncatedText text={suggestion.to} />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#A3A3A3] text-sm">Amount</span>
            <span className="text-[#00FFC6] font-semibold">
              {suggestion.amount} ETH
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};