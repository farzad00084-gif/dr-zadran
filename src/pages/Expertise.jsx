import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Info, ShieldAlert } from 'lucide-react';
import { expertiseAreas } from '../data/expertise.js';
import useLanguage from '../hooks/useLanguage.js';
import Seo from '../components/common/Seo.jsx';
import PageIntro from '../components/common/PageIntro.jsx';
import ExpertiseArea from '../components/expertise/ExpertiseArea.jsx';
import ContactBand from '../components/common/ContactBand.jsx';
import { buildPhysicianSchema } from '../utils/seo.js';

export default function Expertise() {
  const { t } = useTranslation();
  const { path, lang } = useLanguage();

  return (
    <>
      <Seo
        page="expertise"
        jsonLd={buildPhysicianSchema({
          lang,
          roleFull: t('brand.roleFull'),
          affiliation: t('home.hero.affiliationValue'),
        })}
      />
      <PageIntro
        eyebrow={t('expertise.intro.eyebrow')}
        title={t('expertise.intro.title')}
        lead={t('expertise.intro.lead')}
        count="05"
        breadcrumb={[
          { label: t('nav.home'), to: path('/') },
          { label: t('expertise.intro.breadcrumb') },
        ]}
      >
        <p className="border-s-2 border-gold ps-4 text-xs leading-relaxed text-muted">
          {t('expertise.intro.note')}
        </p>
      </PageIntro>

      <section className="pb-16 md:pb-24">
        <div className="container-editorial">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <aside className="lg:col-span-3" aria-label={t('expertise.intro.indexLabel')}>
              <div className="lg:sticky lg:top-28">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-muted/60 rtl:tracking-normal rtl:text-[0.7rem]">
                  {t('expertise.intro.indexLabel')}
                </p>
                <ol className="mt-3 border-t border-line">
                  {expertiseAreas.map((area) => (
                    <li key={area.id} className="border-b border-line">
                      <a
                        href={`#${area.id}`}
                        className="group flex items-center justify-between gap-3 py-3 text-sm text-muted transition-colors hover:text-forest"
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="number-ltr text-[0.58rem] font-semibold text-gold">
                            {area.index}
                          </span>
                          {t(area.titleKey)}
                        </span>
                        <ArrowUpRight
                          className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ol>

                <div className="mt-7 border border-line bg-paper p-4">
                  <p className="flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-forest rtl:tracking-normal rtl:text-[0.7rem]">
                    <Info className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                    {t('expertise.noticeTitle')}
                  </p>
                  <p className="mt-2 text-[0.7rem] leading-relaxed text-muted">
                    {t('expertise.notice')}
                  </p>
                </div>

                <Link
                  to={path('/patient-guide#emergency')}
                  className="mt-4 flex items-start gap-2 border border-emergency/20 bg-emergency-bg p-4 text-[0.7rem] leading-relaxed text-emergency transition-colors hover:border-emergency/40"
                >
                  <ShieldAlert className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
                  <span>{t('expertise.emergencyLink')}</span>
                </Link>
              </div>
            </aside>

            <div className="lg:col-span-9">
              {expertiseAreas.map((area, index) => (
                <ExpertiseArea key={area.id} area={area} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactBand
        eyebrow={t('contact.intro.eyebrow')}
        title={t('expertise.ctaTitle')}
        body={t('expertise.ctaBody')}
        primaryLabel={t('expertise.cta')}
        secondary={{ label: t('expertise.emergencyLink'), to: '/patient-guide#emergency' }}
      />
    </>
  );
}
