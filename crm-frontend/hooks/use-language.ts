import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'en' | 'ar';

interface LanguageStore {
  language: Language;
  direction: 'ltr' | 'rtl';
  setLanguage: (language: Language) => void;
}

export const useLanguage = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'en',
      direction: 'ltr',
      setLanguage: (language) =>
        set({
          language,
          direction: language === 'ar' ? 'rtl' : 'ltr',
        }),
    }),
    {
      name: 'language-storage',
    }
  )
);
