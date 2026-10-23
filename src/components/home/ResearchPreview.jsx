import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink, FileCheck2 } from 'lucide-react';
import { publications } from '../../data/publications.js';
import useLanguage from '../../hooks/useLanguage.js';
import SectionHeading from '../common/SectionHeading.jsx';
import EmptyState from '../common/EmptyState.jsx';

export default function ResearchPreview() {
  const { t } = useTranslation();
  const { path } = useLanguage();
  const publication = publications[0];

  return (
    <section className="section-pad border-b border-line">
      <div className="container-editorial">
        <SectionHeading
          eyebrow={t('home.research.eyebrow')}
          title={t('home.research.heading')}
          intro={t('home.research.intro')}
          link={
            <Link to={path('/research')} className="link-editorial">
              <span>{t('home.research.link')}</span>
              <ArrowUpRight className="directional-icon h-4 w-4" aria-hidden="true" />
            </Link>
          }
        />

        <div className="mt-12">
          {publication ? (
            <article className="plate group grid overflow-hidden lg:grid-cols-12">
              <div className="flex flex-col justify-between border-b border-line p-6 sm:p-8 lg:col-span-7 lg:border-b-0 lg:border-e">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 border border-teal/25 bg-mint px-2 py-1 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-teal rtl:tracking-normal rtl:text-[0.68rem]">
                      <FileCheck2 className="h-3.5 w-3.5" aria-hidden="true" />
                      {t('common.verifiedPublication')}
                    </span>
                    <span className="number-ltr text-[0.64rem] font-semibold text-muted/60">
                      {publication.year} · {publication.journal}
                    </span>
                  </div>
                  <h3
                    className="mt-5 max-w-2xl font-display text-[clamp(1.5rem,2.5vw,2.15rem)] leading-tight text-forest"
                    dir="ltr"
                  >
                    {publication.title}
                  </h3>
                  <p className="mt-4 text-xs leading-relaxed text-muted">
                    <span className="font-semibold text-forest/80">{t('home.research.authorsLabel')}: </span>
                    <bdi dir="ltr">{publication.authors.join(', ')}</bdi>
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-4">
                  <a
                    href={publication.doiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-forest transition-colors hover:text-teal"
                  >
                    DOI: <bdi dir="ltr">{publication.doi}</bdi>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                  <a
                    href={publication.pubmedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-muted transition-colors hover:text-forest"
                  >
                    PubMed
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="flex flex-col justify-between bg-forest p-6 text-paper sm:p-8 lg:col-span-5">
                <div>
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-sage/60 rtl:tracking-normal rtl:text-[0.7rem]">
                    {t('research.publications.summaryLabel')}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-sage/85">
                    {t(publication.summaryKey)}
                  </p>
                </div>
                <div className="mt-8">
                  <p className="border-t border-paper/20 pt-4 text-[0.72rem] leading-relaxed text-sage/55">
                    {t(publication.noteKey)}
                  </p>
                  <p className="mt-3 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-gold/80 rtl:tracking-normal rtl:text-[0.7rem]">
                    {t('home.research.sourceNote')}
                  </p>
                </div>
              </div>
            </article>
          ) : (
            <EmptyState
              title={t('research.publications.emptyTitle')}
              body={t('research.publications.emptyBody')}
            />
          )}
        </div>
      </div>
    </section>
  );
}
