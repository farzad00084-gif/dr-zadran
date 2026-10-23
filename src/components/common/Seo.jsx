import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { doctor } from '../../data/doctor.js';
import { routeMeta } from '../../data/navigation.js';
import { LANGUAGES, localizedPath } from '../../utils/localizedPath.js';

function upsertMeta(attribute, key, content) {
  if (!content) return;
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertLink(rel, href, extra = {}) {
  let element = document.head.querySelector(`link[rel="${rel}"]${extra.hreflang ? `[hreflang="${extra.hreflang}"]` : ''}`);
  if (!href) {
    element?.remove();
    return;
  }
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    Object.entries(extra).forEach(([key, value]) => element.setAttribute(key, value));
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

const ogLocales = { en: 'en_US', fa: 'fa_AF', ps: 'ps_AF' };

export default function Seo({ page = 'home', jsonLd }) {
  const { t, i18n } = useTranslation();
  const meta = routeMeta[page] ?? routeMeta.home;
  const lang = i18n.resolvedLanguage || 'en';
  const title = t(meta.titleKey);
  const description = t(meta.descriptionKey);
  const baseUrl = doctor.site.url?.replace(/\/$/, '') || '';
  const localPath = localizedPath(meta.path, lang);
  const canonical = baseUrl ? `${baseUrl}${localPath === '/' ? '/' : localPath}` : '';

  useLayoutEffect(() => {
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', page === 'notFound' ? 'noindex,follow' : 'index,follow');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', t('meta.siteName'));
    upsertMeta('property', 'og:locale', ogLocales[lang] ?? 'en_US');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    if (baseUrl) {
      upsertMeta('property', 'og:url', canonical);
      upsertMeta('property', 'og:image', `${baseUrl}/og-cover.png`);
      upsertMeta('name', 'twitter:image', `${baseUrl}/og-cover.png`);
    }

    upsertLink('canonical', canonical);
    document.head.querySelectorAll('link[data-hreflang]').forEach((node) => node.remove());
    if (baseUrl) {
      LANGUAGES.forEach((language) => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = language.code;
        link.href = `${baseUrl}${localizedPath(meta.path, language.code) === '/' ? '/' : localizedPath(meta.path, language.code)}`;
        link.dataset.hreflang = 'true';
        document.head.appendChild(link);
      });
      const fallback = document.createElement('link');
      fallback.rel = 'alternate';
      fallback.hreflang = 'x-default';
      fallback.href = `${baseUrl}${meta.path === '/' ? '/' : meta.path}`;
      fallback.dataset.hreflang = 'true';
      document.head.appendChild(fallback);
    }

    document.head.querySelectorAll('meta[property^="og:locale:alternate"]').forEach((node) => node.remove());
    LANGUAGES.filter((language) => language.code !== lang).forEach((language) => {
      const alternate = document.createElement('meta');
      alternate.setAttribute('property', 'og:locale:alternate');
      alternate.setAttribute('content', ogLocales[language.code]);
      document.head.appendChild(alternate);
    });

    const scriptId = 'page-structured-data';
    document.getElementById(scriptId)?.remove();
    if (jsonLd) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, canonical, baseUrl, lang, page, meta.path, jsonLd, t]);

  return null;
}
