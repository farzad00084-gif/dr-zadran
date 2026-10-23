import fs from 'node:fs/promises';
import path from 'node:path';
import { routeMeta } from '../src/data/navigation.js';
import { LANGUAGES, localizedPath } from '../src/utils/localizedPath.js';

const root = process.cwd();
const dist = path.join(root, 'dist');
const placeholderOrigin = 'https://drkhalidzadran.example';
const pages = Object.entries(routeMeta).filter(([id]) => id !== 'notFound');

async function readEnvFile(file) {
  try {
    const contents = await fs.readFile(path.join(root, file), 'utf8');
    for (const line of contents.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!match) continue;
      const value = match[2].replace(/^['"]|['"]$/g, '');
      if (!process.env[match[1]]) process.env[match[1]] = value;
    }
  } catch {
    // Environment file is optional.
  }
}

for (const file of ['.env', '.env.local', '.env.production', '.env.production.local']) {
  await readEnvFile(file);
}

const configuredOrigin = (process.env.SITE_URL || process.env.VITE_SITE_URL || '').replace(/\/$/, '');
const siteOrigin = configuredOrigin || placeholderOrigin;
if (!configuredOrigin) {
  console.warn(
    `[prerender] SITE_URL/VITE_SITE_URL is not set. Canonical and sitemap URLs use ${placeholderOrigin}. Set the production origin before deployment.`,
  );
}

const translations = Object.fromEntries(
  await Promise.all(
    LANGUAGES.map(async ({ code }) => {
      const json = await fs.readFile(
        path.join(root, 'src', 'i18n', 'locales', code, 'translation.json'),
        'utf8',
      );
      return [code, JSON.parse(json)];
    }),
  ),
);

const shell = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
const buildDate = new Date().toISOString().slice(0, 10);
const getTranslation = (dictionary, key) =>
  key.split('.').reduce((value, part) => (value == null ? undefined : value[part]), dictionary);

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

function absolutePath(lang, routePath) {
  const localized = localizedPath(routePath, lang);
  return localized === '/' ? '/' : localized;
}

function absoluteUrl(lang, routePath) {
  return `${siteOrigin}${absolutePath(lang, routePath)}`;
}

function schemaFor(lang, pageId, title, description) {
  const t = translations[lang];
  const meta = routeMeta[pageId];
  const url = absoluteUrl(lang, meta.path);
  const physicianId = `${siteOrigin}/#physician`;
  const breadth = [
    {
      '@type': 'ListItem',
      position: 1,
      name: t.nav.home,
      item: absoluteUrl(lang, '/'),
    },
  ];
  if (pageId !== 'home') {
    breadth.push({
      '@type': 'ListItem',
      position: 2,
      name: t.nav[pageId] ?? title,
      item: url,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Physician',
        '@id': physicianId,
        name: 'Dr. Khalid Khan Zadran',
        alternateName: 'Dr. Khalid Khan Zadran',
        jobTitle: 'Consultant Neurosurgeon | Brain & Spine Surgeon',
        telephone: '+93787654751',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Kabul',
          addressCountry: 'AF',
        },
        affiliation: {
          '@type': 'MedicalClinic',
          name: 'Rifah Medical Complex',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Kabul',
            addressCountry: 'AF',
          },
        },
        sameAs: ['https://www.facebook.com/DrKhalidkhanzadran/'],
        knowsLanguage: ['en', 'fa', 'ps'],
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: lang,
        about: { '@id': physicianId },
        isPartOf: {
          '@type': 'WebSite',
          name: 'Dr. Khalid Khan Zadran',
          url: `${siteOrigin}/`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: breadth,
      },
    ],
  };
}

function buildHead(lang, pageId, title, description, robots = 'index,follow') {
  const meta = routeMeta[pageId];
  const url = absoluteUrl(lang, meta.path);
  const schema = schemaFor(lang, pageId, title, description);
  const alternates = LANGUAGES.map(({ code }) => {
    const href = absoluteUrl(code, meta.path);
    return `<link rel="alternate" hreflang="${code}" href="${escapeHtml(href)}" />`;
  }).join('\n    ');
  const defaultHref = absoluteUrl('en', meta.path);

  return {
    url,
    title,
    description,
    schema,
    head: `
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${escapeHtml(url)}" />
    ${alternates}
    <link rel="alternate" hreflang="x-default" href="${escapeHtml(defaultHref)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeHtml(translations[lang].meta.siteName)}" />
    <meta property="og:url" content="${escapeHtml(url)}" />
    <meta property="og:image" content="${escapeHtml(`${siteOrigin}/og-cover.png`)}" />
    <meta property="og:locale" content="${lang === 'fa' ? 'fa_AF' : lang === 'ps' ? 'ps_AF' : 'en_US'}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(`${siteOrigin}/og-cover.png`)}" />`,
  };
}

function replaceHead(html, lang, head) {
  let output = html
    .replace(/<html[^>]*>/, `<html lang="${lang}" dir="${lang === 'en' ? 'ltr' : 'rtl'}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(head.title)}</title>`)
    .replace(
      /\s*<meta\s+(?:name|property)="(?:description|robots|og:[^"]*|twitter:[^"]*)"[^>]*>/g,
      '',
    )
    .replace(/\s*<link rel="canonical"[^>]*>/g, '')
    .replace(/\s*<link rel="alternate" hreflang="[^"]*"[^>]*>/g, '')
    .replace('</head>', `${head.head}\n  </head>`);

  output = output.replace(
    /<script id="page-structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script id="page-structured-data" type="application/ld+json">${JSON.stringify(head.schema)}</script>`,
  );
  return output;
}

const written = [];
for (const { code: lang } of LANGUAGES) {
  for (const [pageId, meta] of pages) {
    const t = translations[lang];
    const title = getTranslation(t, meta.titleKey);
    const description = getTranslation(t, meta.descriptionKey);
    const head = buildHead(lang, pageId, title, description);
    const { url } = head;

    const localized = absolutePath(lang, meta.path);
    const outDir = localized === '/' ? dist : path.join(dist, localized.slice(1));
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, 'index.html'), replaceHead(shell, lang, head), 'utf8');
    written.push({ lang, pageId, url });
  }
}

const notFoundTitle = getTranslation(translations.en, 'meta.notFound.title');
const notFoundDescription = getTranslation(translations.en, 'meta.notFound.description');
const notFoundHead = buildHead('en', 'notFound', notFoundTitle, notFoundDescription, 'noindex,follow');
notFoundHead.schema = schemaFor('en', 'home', notFoundTitle, notFoundDescription);
await fs.writeFile(path.join(dist, '404.html'), replaceHead(shell, 'en', notFoundHead), 'utf8');

const sitemapUrls = LANGUAGES.flatMap(({ code: lang }) =>
  pages.map(([, meta]) => {
    const alternates = LANGUAGES.map(
      ({ code }) =>
        `    <xhtml:link rel="alternate" hreflang="${code}" href="${escapeHtml(absoluteUrl(code, meta.path))}" />`,
    ).join('\n');
    return `  <url>
    <loc>${escapeHtml(absoluteUrl(lang, meta.path))}</loc>
    <lastmod>${buildDate}</lastmod>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeHtml(absoluteUrl('en', meta.path))}" />
  </url>`;
  }),
).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapUrls}
</urlset>
`;
await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap, 'utf8');
await fs.writeFile(
  path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /404\nSitemap: ${siteOrigin}/sitemap.xml\n`,
  'utf8',
);
await fs.copyFile(path.join(root, 'public', '_redirects'), path.join(dist, '_redirects'));

console.log(
  `[prerender] Wrote ${written.length} localized route documents, sitemap.xml, robots.txt, and 404.html using ${siteOrigin}.`,
);
