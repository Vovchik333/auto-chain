'use client';

import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languages = {
  en: {
    label: 'English',
    flag: '🇬🇧'
  },
  uk: {
    label: 'Українська',
    flag: '🇺🇦'
  }
};

export function LanguageSwitcher() {
  const locale = useLocale();

  const switchLanguage = (newLocale: string) => {
    window.localStorage.setItem('locale', newLocale);
    window.location.reload();
  };

  const currentLanguage = languages[locale as keyof typeof languages];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2 bg-[#2A2F38] border-[#3A3F48] hover:bg-[#3A3F48] hover:border-[#4A4F58]"
        >
          <span className="text-sm font-medium text-[#F0F0F0]">
            {currentLanguage.flag}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        className="bg-[#2A2F38] border-[#3A3F48]"
      >
        {Object.entries(languages).map(([key, { label, flag }]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => switchLanguage(key)}
            className={`flex items-center gap-2 text-[#F0F0F0] ${
              locale === key 
                ? 'bg-[#3A3F48] font-medium' 
                : 'hover:bg-[#3A3F48] hover:text-[#00FFC6]'
            }`}
          >
            <span className="text-base">{flag}</span>
            <span>{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 