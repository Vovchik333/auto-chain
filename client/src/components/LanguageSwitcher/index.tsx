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
          variant="ghost" 
          size="icon"
          className="w-9 h-9 text-foreground hover:text-primary hover:bg-transparent theme-transition hover-effect"
        >
          <span className="text-base">
            {currentLanguage.flag}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        className="rounded-box-lg bg-background border-border shadow-lg backdrop-blur-sm theme-transition z-[999]"
      >
        {Object.entries(languages).map(([key, { label, flag }]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => switchLanguage(key)}
            className={`flex items-center gap-2 theme-transition ${
              locale === key 
                ? 'bg-secondary/50 text-primary font-medium' 
                : 'text-foreground hover:text-primary hover:bg-secondary/50'
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