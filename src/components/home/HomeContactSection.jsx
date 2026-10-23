import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { doctor } from '../../data/doctor.js';
import useLanguage from '../../hooks/useLanguage.js';
import { WhatsAppAction } from '../common/ContactAction.jsx';

export default function HomeContactSection() {
  const { t } = useTranslation();
  const { path } = useLanguage();

  return (
    <section className="section-pad">
      <div className="container-editorial">
        <div className="grid gap-10 border-t border-forest/20 pt-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">{t('home.contact.eyebrow')}</p>
            <h2 className="display-xl mt-5">{t('home.contact.heading')}</h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted">
              {t('home.contact.intro')}
            </p>
            <div className="mt-8">
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-muted/65 rtl:tracking-normal rtl:text-[0.72rem]">
                {t('home.contact.primary')}
              </p>
              <a
                href={doctor.phone.tel}
                dir="ltr"
                className="number-ltr mt-2 inline-block font-display text-[clamp(2rem,5vw,3.8rem)] leading-none text-forest transition-colors hover:text-teal"
              >
                {doctor.phone.display}
              </a>
              <p className="mt-3 text-xs text-muted/65">{t('home.contact.phoneNote')}</p>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="border border-line bg-paper p-6 sm:p-7">
              <p className="flex items-center gap-2 text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-muted/70 rtl:tracking-normal rtl:text-[0.72rem]">
                <Phone className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                {t('home.clinic.phoneLabel')}
              </p>
              <a
                href={doctor.phone.tel}
                className="btn btn-primary mt-4 w-full"
                aria-label={t('header.callClinicAria', { phone: doctor.phone.display })}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {t('home.contact.primary')}
              </a>
              <WhatsAppAction showPending className="mt-3" />
              <p className="mt-4 border-t border-line pt-4 text-[0.7rem] leading-relaxed text-muted">
                {t('home.contact.whatsappPending')}
              </p>
              <Link
                to={path('/contact')}
                className="mt-4 inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-forest underline decoration-forest/25 underline-offset-4 hover:text-teal"
              >
                {t('home.contact.secondary')}
                <span aria-hidden="true" className="directional-icon">
                  →
                </span>
              </Link>
            </div>
            <p className="mt-4 text-[0.68rem] leading-relaxed text-muted/65">
              {t('home.contact.emergency')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
