import { useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { getDirection } from '../../utils/localizedPath.js';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import ScrollToTop from './ScrollToTop.jsx';
import ScrollProgress from './ScrollProgress.jsx';
import SkipLink from './SkipLink.jsx';

export default function LanguageLayout({ lang }) {
  const { i18n } = useTranslation();

  useLayoutEffect(() => {
    if (i18n.resolvedLanguage !== lang) {
      i18n.changeLanguage(lang);
    }
    document.documentElement.lang = lang;
    document.documentElement.dir = getDirection(lang);
  }, [lang, i18n]);

  useEffect(() => {
    try {
      window.localStorage.setItem('zadran-language', lang);
    } catch {
      // Storage may be unavailable in private browsing; the URL remains the source of truth.
    }
  }, [lang]);

  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <ScrollProgress />
      <SkipLink />
      <Header lang={lang} />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer lang={lang} />
      <ScrollToTop />
    </div>
  );
}
