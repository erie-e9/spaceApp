import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

export const useCopy = (): {
  getCopyValue: (key: string, options?: any) => string;
} => {
  const { t: translation } = useTranslation();
  const getCopyValue = (key: string, options?: any): string => {
    return translation(key, options) as string;
  };
  return { getCopyValue };
};

export const changeLanguage = (key: string): void => {
  i18next.changeLanguage(key);
};

export { i18next };
