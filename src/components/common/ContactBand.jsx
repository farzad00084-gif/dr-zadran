import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { doctor } from '../../data/doctor.js';
import useLanguage from '../../hooks/useLanguage.js';

export default function ContactBand({ eyebrow, title, body, primaryLabel, secondary }) {
  const { t } = useTranslation();
  const { path } = useLanguage();
  const secondaryLink = secondary
    ? secondary.href
      ? null
      : path(secondary.to ?? '/contact')
    : null;

  return (
    <section className="relative overflow-hidden bg-forest text-paper">
      <div className="container-editorial relative py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            {eyebrow ? <p className="eyebrow !text-sage">{eyebrow}</p> : null}
            <h2 className="display-md mt-4 max-w-2xl !text-paper">{title}</h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-sage/70">{body}</p>
            <div className="mt-7 max-w-xl border-s-2 border-gold bg-paper/[0.06] px-4 py-3">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.1em] text-gold rtl:tracking-normal rtl:text-[0.7rem]">
                {t('common.emergency')}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-sage/70">
                {t('common.emergencyAction')}
              </p>
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-sage/50 rtl:tracking-normal rtl:text-[0.7rem]">
              {t('common.clinicLine')}
            </p>
            <a
              href={doctor.phone.tel}
              dir="ltr"
              className="number-ltr mt-2 block font-display text-[clamp(1.9rem,4vw,2.9rem)] leading-none text-paper transition-colors hover:text-sage"
            >
              {doctor.phone.display}
            </a>
            <a href={doctor.phone.tel} className="btn btn-light mt-5 w-full">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {primaryLabel ?? t('common.callClinic')}
            </a>
            {secondary ? (
              secondaryLink ? (
                <Link
                  to={secondaryLink}
                  className="mt-3 inline-flex min-h-11 w-full items-center justify-center border border-paper/25 px-4 text-xs font-semibold text-paper transition-colors hover:bg-paper/10"
                >
                  {secondary.label}
                </Link>
              ) : (
                <a
                  href={secondary.href}
                  target={secondary.external ? '_blank' : undefined}
                  rel={secondary.external ? 'noopener noreferrer' : undefined}
                  className="mt-3 inline-flex min-h-11 w-full items-center justify-center border border-paper/25 px-4 text-xs font-semibold text-paper transition-colors hover:bg-paper/10"
                >
                  {secondary.label}
                </a>
              )
            ) : null}
            <p className="mt-4 text-[0.68rem] leading-relaxed text-sage/45">{t('footer.emergency')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
