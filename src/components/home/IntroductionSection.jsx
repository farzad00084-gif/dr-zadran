import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useLanguage from '../../hooks/useLanguage.js';
import Reveal from '../common/Reveal.jsx';

export default function IntroductionSection() {
  const { t } = useTranslation();
  const { path } = useLanguage();

  return (
    <section id="introduction" className="section-pad">
      <div className="container-editorial">
        <Reveal className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="eyebrow">{t('home.intro.eyebrow')}</p>
            <h2 className="display-lg mt-5">{t('home.intro.heading')}</h2>
            <div className="mt-8 hidden h-px w-24 bg-gold lg:block" aria-hidden="true" />
            <p className="mt-6 max-w-xs text-xs font-semibold uppercase leading-relaxed tracking-[0.11em] text-muted/65 rtl:tracking-normal rtl:text-sm">
              {t('brand.tagline')} · {t('home.hero.locationLabel')}
            </p>
          </div>

          <div className="lg:col-span-7">
            <p className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-snug text-forest">
              {t('home.intro.lead')}
            </p>
            <div className="mt-7 grid gap-8 md:grid-cols-12">
              <div className="prose-editorial md:col-span-8">
                <p>{t('home.intro.body')}</p>
                <Link
                  to={path('/about')}
                  className="link-editorial mt-7"
                >
                  <span>{t('home.intro.link')}</span>
                  <ArrowUpRight className="directional-icon h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <aside className="md:col-span-4">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-muted/70 rtl:tracking-normal rtl:text-[0.72rem]">
                  {t('home.intro.asideLabel')}
                </p>
                <dl className="mt-3 border-t border-line">
                  {[
                    [t('home.intro.asideRole'), t('home.intro.asideRoleValue')],
                    [t('home.intro.asideBase'), t('home.intro.asideBaseValue')],
                    [t('home.intro.asideFocus'), t('home.intro.asideFocusValue')],
                  ].map(([term, value]) => (
                    <div key={term} className="border-b border-line py-3">
                      <dt className="text-[0.65rem] text-muted/70">{term}</dt>
                      <dd className="mt-1 text-sm font-semibold leading-snug text-forest">{value}</dd>
                    </div>
                  ))}
                </dl>
              </aside>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
