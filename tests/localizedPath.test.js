import { describe, expect, it } from 'vitest';
import {
  getDirection,
  getLanguageFromPath,
  isRtl,
  LANGUAGES,
  localizedPath,
  stripLanguagePrefix,
} from '../src/utils/localizedPath.js';

describe('localized routing', () => {
  it('detects only supported language prefixes', () => {
    expect(getLanguageFromPath('/fa/about')).toBe('fa');
    expect(getLanguageFromPath('/ps/patient-guide')).toBe('ps');
    expect(getLanguageFromPath('/about')).toBe('en');
    expect(getLanguageFromPath('/fr/about')).toBe('en');
    expect(getLanguageFromPath('/')).toBe('en');
  });

  it('strips a non-default prefix without altering English paths', () => {
    expect(stripLanguagePrefix('/fa')).toBe('/');
    expect(stripLanguagePrefix('/ps/about')).toBe('/about');
    expect(stripLanguagePrefix('/about')).toBe('/about');
  });

  it('prefixes paths while preserving hashes and queries', () => {
    expect(localizedPath('/', 'en')).toBe('/');
    expect(localizedPath('/', 'fa')).toBe('/fa');
    expect(localizedPath('/patient-guide#emergency', 'ps')).toBe('/ps/patient-guide#emergency');
    expect(localizedPath('/contact?from=home', 'fa')).toBe('/fa/contact?from=home');
  });

  it('reports text direction for each supported language', () => {
    expect(LANGUAGES).toHaveLength(3);
    expect(getDirection('fa')).toBe('rtl');
    expect(getDirection('ps')).toBe('rtl');
    expect(getDirection('en')).toBe('ltr');
    expect(isRtl('ps')).toBe(true);
    expect(isRtl('en')).toBe(false);
  });
});
