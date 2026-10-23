import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Database, Fingerprint, ShieldCheck } from 'lucide-react';
import { publications } from '../data/publications.js';
import useLanguage from '../hooks/useLanguage.js';
import Seo from '../components/common/Seo.jsx';
import PageIntro from '../components/common/PageIntro.jsx';
import PublicationCard from '../components/research/PublicationCard.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import ContactBand from '../components/common/ContactBand.jsx';
import EditorialPhoto from '../components/common/EditorialPhoto.jsx';
import { editorialImages } from '../data/editorialImages.js';
import { buildPhysicianSchema, buildPublicationSchema } from '../utils/seo.js';

export default function Research() {
  const { t } = useTranslation();
  const { path, lang } = useLanguage();
  const interests = t('research.interests.items', { returnObjects: true });

  const schema = [
    buildPhysicianSchema({
      lang,
      roleFull: t('brand.roleFull'),
      affiliation: t('home.hero.affiliationValue'),
    }),
    buildPublicationSchema(publications[0]),
  ].filter(Boolean);

  return (
    <>
      <Seo page="research" jsonLd={schema} />
      <PageIntro
        eyebrow={t('research.intro.eyebrow')}
        title={t('research.intro.title')}
        lead={t('research.intro.lead')}
        count={String(publications.length).padStart(2, '0')}
        breadcrumb={[
          { label: t('nav.home'), to: path('/') },
          { label: t('research.intro.breadcrumb') },
        ]}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.68rem] text-muted">
          <span className="inline-flex items-center gap-1.5 font-semibold text-teal">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            {t('research.intro.recordsVerified', { count: publications.length })}
          </span>
          <span aria-hidden="true" className="h-3 w-px bg-line" />
          <span>{t('research.intro.lastVerified')}</span>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted">{t('research.intro.note')}</p>
      </PageIntro>

      <section className="pb-12 md:pb-16">
        <div className="container-editorial">
          <EditorialPhoto
            image={editorialImages.neuroimaging}
            aspect="aspect-[3/2] md:aspect-[2/1]"
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="border-t border-line pt-8 md:pt-10"
          />
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container-editorial">
          <div className="grid gap-8 border-t border-line pt-10 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-3">
              <p className="eyebrow">{t('research.method.eyebrow')}</p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-forest">
                {t('research.method.heading')}
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-5">
              <p className="max-w-2xl text-sm leading-relaxed text-muted">
                {t('research.method.body')}
              </p>
              <p className="mt-4 max-w-2xl text-xs leading-relaxed text-muted/70">
                {t('research.method.sourceNote')}
              </p>
            </div>
            <div className="lg:col-span-3 lg:col-start-10">
              <div className="border border-teal/20 bg-mint p-4">
                <p className="flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-teal rtl:tracking-normal rtl:text-[0.68rem]">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  {t('research.method.status')}
                </p>
                <div className="mt-4 flex items-center gap-3 border-t border-teal/15 pt-3 text-teal/60">
                  <Database className="h-4 w-4" aria-hidden="true" />
                  <span className="text-[0.6rem] font-semibold">PubMed</span>
                  <span aria-hidden="true">/</span>
                  <Fingerprint className="h-4 w-4" aria-hidden="true" />
                  <span className="text-[0.6rem] font-semibold">DOI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper">
        <div className="container-editorial py-16 md:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">{t('research.publications.eyebrow')}</p>
              <h2 className="display-md mt-4">{t('research.publications.heading')}</h2>
            </div>
            <span className="number-ltr text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted/55">
              {String(publications.length).padStart(2, '0')} / {String(publications.length).padStart(2, '0')}
            </span>
          </div>

          {publications.length > 0 ? (
            <div className="space-y-6">
              {publications.map((publication) => (
                <PublicationCard key={publication.id} publication={publication} />
              ))}
            </div>
          ) : (
            <EmptyState
              title={t('research.publications.emptyTitle')}
              body={t('research.publications.emptyBody')}
              action={
                <Link to={path('/contact')} className="btn btn-primary">
                  {t('research.publications.emptyAction')}
                </Link>
              }
            />
          )}
        </div>
      </section>

      <section className="section-pad border-t border-line bg-stone/35">
        <div className="container-editorial">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">{t('research.interests.eyebrow')}</p>
              <h2 className="display-lg mt-5">{t('research.interests.heading')}</h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
                {t('research.interests.intro')}
              </p>
              <p className="mt-5 border-s-2 border-gold ps-4 text-xs leading-relaxed text-muted/70">
                {t('research.interests.note')}
              </p>
              <EditorialPhoto
                image={editorialImages.microscope}
                aspect="aspect-[4/5]"
                sizes="(min-width: 1024px) 280px, 70vw"
                className="mt-8 max-w-[280px]"
              />
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="grid border-s border-t border-forest/15 sm:grid-cols-2">
                {Array.isArray(interests) &&
                  interests.map((interest, index) => (
                    <li
                      key={interest.title}
                      className="flex min-h-[176px] flex-col border-b border-e border-forest/15 p-5"
                    >
                      <span className="number-ltr text-[0.58rem] font-semibold text-gold">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="mt-4 font-display text-xl leading-tight text-forest">
                        {interest.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted">{interest.body}</p>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ContactBand
        eyebrow={t('contact.intro.eyebrow')}
        title={t('research.cta.heading')}
        body={t('research.cta.body')}
        primaryLabel={t('research.cta.call')}
        secondary={{ label: t('nav.contact'), to: '/contact' }}
      />
    </>
  );
}
