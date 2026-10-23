import { useTranslation } from 'react-i18next';
import { ShieldCheck } from 'lucide-react';
import useLanguage from '../hooks/useLanguage.js';
import Seo from '../components/common/Seo.jsx';
import PageIntro from '../components/common/PageIntro.jsx';
import ContactBand from '../components/common/ContactBand.jsx';

export default function Privacy() {
  const { t } = useTranslation();
  const { path } = useLanguage();
  const sections = t('privacy.sections', { returnObjects: true });

  return (
    <>
      <Seo page="privacy" />
      <PageIntro
        eyebrow={t('privacy.intro.eyebrow')}
        title={t('privacy.intro.title')}
        lead={t('privacy.intro.lead')}
        breadcrumb={[
          { label: t('nav.home'), to: path('/') },
          { label: t('privacy.intro.breadcrumb') },
        ]}
      >
        <p className="inline-flex items-center gap-2 border border-line bg-paper px-3 py-2 text-[0.68rem] font-semibold text-muted">
          <ShieldCheck className="h-3.5 w-3.5 text-teal" aria-hidden="true" />
          {t('privacy.intro.updated')}
        </p>
      </PageIntro>

      <section className="pb-16 md:pb-24">
        <div className="container-editorial">
          <div className="grid gap-10 border-t border-line pt-8 lg:grid-cols-12 lg:gap-12">
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted/60 rtl:tracking-normal rtl:text-[0.7rem]">
                  {t('privacy.intro.breadcrumb')}
                </p>
                <ol className="mt-3 border-t border-line">
                  {Array.isArray(sections) &&
                    sections.map((section, index) => (
                      <li key={section.title} className="border-b border-line">
                        <a
                          href={`#privacy-${index + 1}`}
                          className="flex items-baseline gap-3 py-2.5 text-xs leading-snug text-muted transition-colors hover:text-forest"
                        >
                          <span className="number-ltr text-[0.56rem] font-semibold text-gold">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          {section.title}
                        </a>
                      </li>
                    ))}
                </ol>
              </div>
            </aside>

            <div className="lg:col-span-8 lg:col-start-5">
              {Array.isArray(sections) &&
                sections.map((section, index) => (
                  <article
                    key={section.title}
                    id={`privacy-${index + 1}`}
                    className="scroll-mt-28 border-t border-line py-7 first:border-t-0 first:pt-0"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="number-ltr text-[0.62rem] font-semibold text-gold">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h2 className="font-display text-[clamp(1.5rem,2.5vw,2rem)] leading-tight text-forest">
                        {section.title}
                      </h2>
                    </div>
                    <p className="mt-3 max-w-2xl ps-8 text-sm leading-relaxed text-muted">
                      {section.body}
                    </p>
                  </article>
                ))}
            </div>
          </div>
        </div>
      </section>

      <ContactBand
        eyebrow={t('privacy.intro.eyebrow')}
        title={t('privacy.contact.heading')}
        body={t('privacy.contact.body')}
        primaryLabel={t('privacy.contact.cta')}
        secondary={{ label: t('patientGuide.cta.contact'), to: '/contact' }}
      />
    </>
  );
}
