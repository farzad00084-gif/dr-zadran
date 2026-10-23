import { useTranslation } from 'react-i18next';
import { localizedPath } from '../utils/localizedPath.js';

export default function useLanguage() {
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || 'en';
  return {
    lang,
    path: (path) => localizedPath(path, lang),
    isRtl: lang === 'fa' || lang === 'ps',
  };
}
