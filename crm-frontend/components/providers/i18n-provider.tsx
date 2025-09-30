'use client';

import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { useLanguage } from '@/hooks/use-language';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { language, direction } = useLanguage();

  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
