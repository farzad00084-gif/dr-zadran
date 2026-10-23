import { doctor } from '../data/doctor.js';

export function buildPhysicianSchema({ lang, roleFull, affiliation }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: lang === 'en' ? doctor.name : undefined,
    alternateName: doctor.name,
    jobTitle: roleFull,
    telephone: doctor.phone.e164,
    address: {
      '@type': 'PostalAddress',
      addressLocality: doctor.location.city,
      addressCountry: doctor.location.countryCode,
    },
    affiliation: {
      '@type': 'MedicalClinic',
      name: affiliation,
      address: {
        '@type': 'PostalAddress',
        addressLocality: doctor.location.city,
        addressCountry: doctor.location.countryCode,
      },
    },
    sameAs: [doctor.facebook.url],
    knowsLanguage: ['en', 'fa', 'ps'],
  };

  if (doctor.site.url) schema.url = doctor.site.url;
  return schema;
}

export function buildPublicationSchema(publication) {
  if (!publication) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: publication.title,
    author: publication.authors.map((name) => ({ '@type': 'Person', name })),
    datePublished: String(publication.year),
    isPartOf: {
      '@type': 'Periodical',
      name: publication.journal,
      volumeNumber: publication.volume,
      issueNumber: publication.issue,
    },
    pageStart: Number(publication.pages.split('–')[0]),
    pageEnd: Number(publication.pages.split('–')[1]),
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'DOI',
      value: publication.doi,
    },
    sameAs: [publication.doiUrl, publication.pubmedUrl, publication.pmcUrl].filter(Boolean),
  };
}

export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}
