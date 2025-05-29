'use client';

import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';
import { useTranslations } from 'next-intl';

const languages = {
  en: 'English',
  uk: 'Українська'
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations();

  const switchLanguage = (newLocale: string) => {
    // This will be handled by the TranslationsProvider
    window.localStorage.setItem('locale', newLocale);
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([key, label]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => switchLanguage(key)}
            className={locale === key ? 'bg-accent' : ''}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 