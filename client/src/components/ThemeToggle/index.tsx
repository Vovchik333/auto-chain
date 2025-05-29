'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/theme.context';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('common');

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-9 h-9 text-foreground hover:text-primary hover:bg-transparent theme-transition hover-effect"
      title={theme === 'dark' ? t('switchToLight') : t('switchToDark')}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">
        {theme === 'dark' ? t('switchToLight') : t('switchToDark')}
      </span>
    </Button>
  );
} 