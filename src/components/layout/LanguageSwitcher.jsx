import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LANGUAGES, localizedPath, stripLanguagePrefix } from '../../utils/localizedPath.js';

export default function LanguageSwitcher({ lang, tone = 'light', className = '' }) {
  const { t, i18n } = useTranslation();
  const { pathname, search, hash } = useLocation();
  const basePath = stripLanguagePrefix(pathname);

  const handleChange = (code) => {
    i18n.changeLanguage(code);
    try {
      window.localStorage.setItem('zadran-language', code);
    } catch {
      // The URL remains the source of truth.
    }
  };

  return (
    <nav
      aria-label={t('header.languageLabel')}
      className={`items-center gap-1 ${className}`}
    >
      {LANGUAGES.map((language) => {
        const active = language.code === lang;
        return (
          <Link
            key={language.code}
            to={`${localizedPath(basePath, language.code)}${search}${hash}`}
            hrefLang={language.code}
            lang={language.code}
            dir={language.dir}
            aria-current={active ? 'true' : undefined}
            aria-label={`${language.label}${active ? ` — ${t('header.currentLanguage')}` : ''}`}
            onClick={() => handleChange(language.code)}
            className={`inline-flex min-h-11 items-center rounded-none border-b px-2 text-[0.78rem] font-semibold transition-colors ${
              tone === 'dark'
                ? active
                  ? 'border-gold text-paper'
                  : 'border-transparent text-sage/70 hover:border-paper/30 hover:text-paper'
                : active
                  ? 'border-gold text-forest'
                  : 'border-transparent text-muted hover:border-forest/30 hover:text-forest'
            }`}
          >
            {language.label}
          </Link>
        );
      })}
    </nav>
  );
}
