import { createContext, Dispatch, SetStateAction } from 'react';

interface LocaleContextType {
  locale: string;
  setLocale: Dispatch<SetStateAction<string>>;
}

const defaultLocale = 'en';

const LocaleContext = createContext<LocaleContextType>({
  locale: defaultLocale,
  setLocale: () => {}, 
});

export default LocaleContext;
