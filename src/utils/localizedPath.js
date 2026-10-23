export const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN', dir: 'ltr' },
  { code: 'fa', label: 'دری', short: 'دری', dir: 'rtl' },
  { code: 'ps', label: 'پښتو', short: 'پښتو', dir: 'rtl' },
];

export const DEFAULT_LANGUAGE = 'en';

export function isSupportedLanguage(lang) {
  return LANGUAGES.some((item) => item.code === lang);
}

export function getLanguageFromPath(pathname = '/') {
  const segment = pathname.split('/').filter(Boolean)[0];
  return isSupportedLanguage(segment) && segment !== DEFAULT_LANGUAGE ? segment : DEFAULT_LANGUAGE;
}

export function stripLanguagePrefix(pathname = '/') {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length && isSupportedLanguage(parts[0]) && parts[0] !== DEFAULT_LANGUAGE) {
    const rest = parts.slice(1).join('/');
    return rest ? `/${rest}` : '/';
  }
  return pathname || '/';
}

export function localizedPath(path = '/', lang = DEFAULT_LANGUAGE) {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === DEFAULT_LANGUAGE || !isSupportedLanguage(lang)) return clean;
  return clean === '/' ? `/${lang}` : `/${lang}${clean}`;
}

export function isRtl(lang) {
  return LANGUAGES.find((item) => item.code === lang)?.dir === 'rtl';
}

export function getDirection(lang) {
  return isRtl(lang) ? 'rtl' : 'ltr';
}
