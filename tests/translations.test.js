import { describe, expect, it } from 'vitest';
import en from '../src/i18n/locales/en/translation.json';
import fa from '../src/i18n/locales/fa/translation.json';
import ps from '../src/i18n/locales/ps/translation.json';

function flattenKeys(value, prefix = '') {
  return Object.entries(value)
    .flatMap(([key, child]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      return child && typeof child === 'object' && !Array.isArray(child)
        ? flattenKeys(child, path)
        : [path];
    })
    .sort();
}

function valuesAtPath(value, path) {
  return path.split('.').reduce((current, part) => current?.[part], value);
}

describe('translation resources', () => {
  const englishKeys = flattenKeys(en);

  it('keeps identical key structures across English, Dari, and Pashto', () => {
    expect(flattenKeys(fa)).toEqual(englishKeys);
    expect(flattenKeys(ps)).toEqual(englishKeys);
  });

  it('does not leave blank strings or untranslated key names', () => {
    for (const [language, dictionary] of Object.entries({ en, fa, ps })) {
      for (const key of englishKeys) {
        const value = valuesAtPath(dictionary, key);
        if (Array.isArray(value) || (value && typeof value === 'object')) continue;
        expect(typeof value, `${language}:${key}`).toBe('string');
        expect(String(value).trim(), `${language}:${key}`).not.toBe('');
        expect(String(value), `${language}:${key}`).not.toBe(key);
      }
    }
  });

  it('includes page metadata for every route', () => {
    for (const page of [
      'home',
      'about',
      'expertise',
      'patientGuide',
      'research',
      'contact',
      'privacy',
      'notFound',
    ]) {
      expect(en.meta[page]?.title, page).toBeTruthy();
      expect(en.meta[page]?.description, page).toBeTruthy();
    }
  });
});
