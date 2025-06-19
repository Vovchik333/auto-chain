'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode, useEffect, useState } from 'react';
import enMessages from '../../../messages/en.json';
import ukMessages from '../../../messages/uk.json';

const messages = {
  en: enMessages,
  uk: ukMessages
};

type Props = {
  children: ReactNode;
};

export function TranslationsProvider({ children }: Props) {
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'uk')) {
      setLocale(savedLocale);
    }
  }, []);

  return (
    <NextIntlClientProvider 
      locale={locale} 
      messages={messages[locale as keyof typeof messages]}
    >
      {children}
    </NextIntlClientProvider>
  );
} 