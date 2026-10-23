import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import useLanguage from '../../hooks/useLanguage.js';
import { EmergencyInline } from '../common/ContactAction.jsx';
import Reveal from '../common/Reveal.jsx';

export default function PatientGuidePreview() {
  const { t } = useTranslation();
  const { path } = useLanguage();
  const steps = t('home.guide.steps', { returnObjects: true });

  return (
    <section className="section-pad border-b border-line bg-sage/45">
      <div className="container-editorial">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">{t('home.guide.eyebrow')}</p>
            <h2 className="display-lg mt-5">{t('home.guide.heading')}</h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">{t('home.guide.intro')}</p>
            <Link to={path('/patient-guide')} className="link-editorial mt-7">
              <span>{t('home.guide.link')}</span>
              <ArrowUpRight className="directional-icon h-4 w-4" aria-hidden="true" />
            </Link>
            <div className="mt-10 hidden items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.13em] text-muted lg:flex rtl:tracking-normal rtl:text-[0.7rem]">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              {t('home.guide.stepLabel')}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-8" delay={80}>
            <div className="border border-forest/12 bg-ivory p-6 shadow-paper sm:p-8">
              <div className="grid gap-0 sm:grid-cols-3">
                {Array.isArray(steps) &&
                  steps.map((step, index) => (
                    <div
                      key={step.title}
                      className="border-b border-line py-5 sm:border-b-0 sm:border-e sm:px-5 sm:py-2 sm:first:ps-0 sm:last:border-e-0 sm:last:pe-0"
                    >
                      <span className="number-ltr font-display text-3xl leading-none text-gold/80">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="mt-4 font-display text-xl leading-tight text-forest">{step.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted">{step.body}</p>
                    </div>
                  ))}
              </div>
              <EmergencyInline className="mt-6" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
