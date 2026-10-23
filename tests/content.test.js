import { describe, expect, it } from 'vitest';
import { doctor } from '../src/data/doctor.js';
import { routeMeta } from '../src/data/navigation.js';
import { publications } from '../src/data/publications.js';

describe('content governance', () => {
  it('publishes only the verified publication with source identifiers', () => {
    expect(publications).toHaveLength(1);
    const publication = publications[0];
    expect(publication.doi).toBe('10.1055/s-0045-1805035');
    expect(publication.pubmedId).toBe('40485786');
    expect(publication.pmcId).toBe('PMC12136956');
    expect(publication.authors.at(-1)).toBe('Zadran KK');
    expect(publication.verifiedOn).toBe('2026-10-22');
    expect(publication.doiUrl).toContain(publication.doi);
  });

  it('keeps unverified contact and credential claims withheld', () => {
    expect(doctor.whatsapp.verified).toBe(false);
    expect(doctor.emergency.verifiedNumber).toBeNull();
    expect(doctor.site.url).not.toMatch(/facebook|wikipedia/i);
    expect(doctor.affiliation).not.toHaveProperty('streetAddress');
    expect(doctor.affiliation).not.toHaveProperty('email');
  });

  it('maps every primary navigation item to metadata', () => {
    for (const page of ['home', 'about', 'expertise', 'patientGuide', 'research', 'contact']) {
      expect(routeMeta[page]?.path, page).toMatch(/^\//);
    }
    expect(routeMeta.privacy.path).toBe('/privacy');
    expect(routeMeta.notFound.path).toBe('/404');
  });
});
