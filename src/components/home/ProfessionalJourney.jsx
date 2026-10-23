import { useTranslation } from 'react-i18next';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { doctor } from '../../data/doctor.js';
import { qualifications } from '../../data/qualifications.js';
import useLanguage from '../../hooks/useLanguage.js';
import { Link } from 'react-router-dom';

export default function ProfessionalJourney() {
  const { t } = useTranslation();
  const { path } = useLanguage();

  return (
    <section className="section-pad border-b border-line bg-stone/35">
      <div className="container-editorial">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="eyebrow">{t('home.journey.eyebrow')}</p>
            <h2 className="display-lg mt-5">{t('home.journey.heading')}</h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              {t('home.journey.intro')}
            </p>
            <Link to={path('/about')} className="link-editorial mt-8">
              <span>{t('home.journey.recordLink')}</span>
              <span aria-hidden="true" className="directional-icon">
                →
              </span>
            </Link>
          </div>

          <div className="lg:col-span-8">
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.15em] text-muted/70 rtl:tracking-normal rtl:text-[0.72rem]">
              {t('home.journey.credentialsLabel')}
            </p>
            <ul className="mt-3 grid grid-cols-2 border-s border-t border-forest/15 sm:grid-cols-3">
              {qualifications.map((credential, index) => (
                <li
                  key={credential.id}
                  className={`relative flex min-h-[118px] flex-col justify-between border-b border-e border-forest/15 p-4 ${
                    index === qualifications.length - 1 ? 'col-span-2 sm:col-span-1' : ''
                  }`}
                >
                  <span className="number-ltr text-[0.6rem] font-semibold tracking-[0.14em] text-gold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="font-display text-[clamp(1.45rem,2.7vw,2.15rem)] leading-tight text-forest"
                    dir="ltr"
                  >
                    {credential.label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-start gap-3 border-s-2 border-teal bg-mint/70 px-4 py-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 flex-none text-teal" aria-hidden="true" />
              <p className="text-xs leading-relaxed text-muted">{t('home.journey.verifiedNote')}</p>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <a
                href={doctor.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-forest underline decoration-forest/25 underline-offset-4 transition-colors hover:text-teal"
              >
                {t('home.journey.profileLink')}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <span className="text-[0.62rem] uppercase tracking-[0.12em] text-muted/55 rtl:tracking-normal">
                {t('about.credentials.verifiedLabel')}
              </span>
            </div>

            <p className="mt-6 border-t border-forest/15 pt-4 text-[0.68rem] leading-relaxed text-muted/65">
              {t('home.journey.timelineNote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
