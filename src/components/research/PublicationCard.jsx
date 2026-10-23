import { useTranslation } from 'react-i18next';
import { ExternalLink, FileCheck2, ShieldCheck } from 'lucide-react';
import { doctor } from '../../data/doctor.js';

const meta = (label, value, ltr = false) => (
  <div className="border-b border-line py-2.5 last:border-b-0">
    <dt className="text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-muted/60 rtl:tracking-normal rtl:text-[0.66rem]">
      {label}
    </dt>
    <dd
      className={`mt-0.5 text-sm font-semibold leading-snug text-forest ${ltr ? 'number-ltr' : ''}`}
      dir={ltr ? 'ltr' : undefined}
    >
      {value}
    </dd>
  </div>
);

export default function PublicationCard({ publication }) {
  const { t } = useTranslation();

  return (
    <article className="border border-line bg-paper shadow-paper">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-mint/70 px-5 py-3 sm:px-7">
        <span className="inline-flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-teal rtl:tracking-normal rtl:text-[0.68rem]">
          <FileCheck2 className="h-4 w-4" aria-hidden="true" />
          {t('common.verifiedPublication')}
        </span>
        <span className="number-ltr text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-muted/65">
          {publication.year} · {publication.journal}
        </span>
      </div>

      <div className="grid lg:grid-cols-12">
        <div className="p-5 sm:p-7 lg:col-span-8 lg:border-e lg:border-line">
          <h3
            dir="ltr"
            className="max-w-3xl font-display text-[clamp(1.55rem,3vw,2.35rem)] leading-tight text-forest rtl:text-end"
          >
            {publication.title}
          </h3>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            <span className="font-semibold text-forest/80">{t('research.publications.authors')}: </span>
            <bdi dir="ltr">{publication.authors.join(', ')}</bdi>
          </p>

          <dl className="mt-6 grid gap-x-8 border-t border-line sm:grid-cols-2">
            {meta(t('research.publications.journal'), publication.journal)}
            {meta(t('research.publications.year'), publication.year)}
            {meta(t('research.publications.volume'), publication.volume)}
            {meta(t('research.publications.pages'), publication.pages, true)}
            {meta(t('research.publications.doi'), publication.doi, true)}
            {meta(t('research.publications.typeLabel'), t('research.publications.typeJournal'))}
          </dl>

          <div className="mt-6 border-t border-line pt-5">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.13em] text-muted/60 rtl:tracking-normal rtl:text-[0.68rem]">
              {t('research.publications.summaryLabel')}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/80">
              {t(publication.summaryKey)}
            </p>
            <p className="mt-4 border-s-2 border-gold ps-4 text-xs leading-relaxed text-muted">
              {t(publication.noteKey)}
            </p>
          </div>
        </div>

        <aside className="flex flex-col justify-between bg-forest p-5 text-paper sm:p-7 lg:col-span-4">
          <div>
            <p className="flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-sage/60 rtl:tracking-normal rtl:text-[0.68rem]">
              <ShieldCheck className="h-4 w-4 text-gold" aria-hidden="true" />
              {t('research.method.eyebrow')}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-sage/60">
              {t('research.intro.lastVerified')}
            </p>
            <dl className="mt-5 border-t border-paper/15">
              <div className="border-b border-paper/15 py-2.5">
                <dt className="text-[0.58rem] uppercase tracking-[0.1em] text-sage/40 rtl:tracking-normal rtl:text-[0.66rem]">
                  PubMed
                </dt>
                <dd className="number-ltr mt-0.5 text-xs text-sage/85" dir="ltr">
                  {publication.pubmedId}
                </dd>
              </div>
              <div className="border-b border-paper/15 py-2.5">
                <dt className="text-[0.58rem] uppercase tracking-[0.1em] text-sage/40 rtl:tracking-normal rtl:text-[0.66rem]">
                  PMC
                </dt>
                <dd className="number-ltr mt-0.5 text-xs text-sage/85" dir="ltr">
                  {publication.pmcId}
                </dd>
              </div>
              <div className="py-2.5">
                <dt className="text-[0.58rem] uppercase tracking-[0.1em] text-sage/40 rtl:tracking-normal rtl:text-[0.66rem]">
                  {t('research.publications.verifiedOn')}
                </dt>
                <dd className="number-ltr mt-0.5 text-xs text-sage/85" dir="ltr">
                  {publication.verifiedOn}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-6 border-t border-paper/15 pt-4">
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.13em] text-sage/45 rtl:tracking-normal rtl:text-[0.66rem]">
              {t('research.publications.sourceLabel')}
            </p>
            <ul className="mt-2 space-y-1">
              {[
                { label: t('research.publications.pubmed'), href: publication.pubmedUrl },
                { label: t('research.publications.pmc'), href: publication.pmcUrl },
                { label: t('research.publications.doiLabel'), href: publication.doiUrl },
              ]
                .filter((link) => link.href)
                .map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-9 items-center gap-1.5 text-xs text-sage/80 underline decoration-sage/25 underline-offset-4 transition-colors hover:text-paper"
                    >
                      {link.label}
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </li>
                ))}
            </ul>
            <p className="mt-3 text-[0.62rem] leading-relaxed text-sage/40">
              {doctor.nameLatin}
            </p>
          </div>
        </aside>
      </div>
    </article>
  );
}
