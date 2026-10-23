import { useTranslation } from 'react-i18next';
import { MapPin, Phone, ShieldAlert } from 'lucide-react';
import { doctor } from '../../data/doctor.js';
import Button from '../common/Button.jsx';
import { PrecisionArcs } from '../art/AnatomyArt.jsx';

export default function ClinicIntroduction() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-forest text-paper">
      <PrecisionArcs
        className="pointer-events-none absolute -end-48 top-1/2 w-[36rem] -translate-y-1/2 text-sage/[0.07]"
      />
      <div className="container-editorial relative py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="eyebrow !text-sage">{t('home.clinic.eyebrow')}</p>
            <h2 className="display-lg mt-5 !text-paper">{t('home.clinic.heading')}</h2>
            <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-sage/80">
              <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
              {t('home.clinic.city')}
            </p>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-sage/65">{t('home.clinic.body')}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={doctor.phone.tel} variant="light" icon={Phone}>
                {t('home.clinic.call')}
              </Button>
              <span className="text-xs text-sage/55">{t('home.clinic.hoursNote')}</span>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="border border-paper/20 bg-paper/[0.04] p-6 backdrop-blur-sm sm:p-8">
              <div className="flex items-center justify-between gap-4 border-b border-paper/15 pb-4">
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-sage/55 rtl:tracking-normal rtl:text-[0.7rem]">
                  {t('home.clinic.phoneLabel')}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
              </div>
              <a
                href={doctor.phone.tel}
                dir="ltr"
                className="number-ltr mt-4 block font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-none text-paper transition-colors hover:text-sage"
              >
                {doctor.phone.display}
              </a>
              <dl className="mt-7 border-t border-paper/15">
                <div className="grid grid-cols-[1fr_1.4fr] gap-3 border-b border-paper/15 py-3">
                  <dt className="text-[0.64rem] uppercase tracking-[0.1em] text-sage/45 rtl:tracking-normal rtl:text-[0.7rem]">
                    {t('common.clinicalAffiliation')}
                  </dt>
                  <dd className="text-xs text-sage/85">{t('home.hero.affiliationValue')}</dd>
                </div>
                <div className="grid grid-cols-[1fr_1.4fr] gap-3 border-b border-paper/15 py-3">
                  <dt className="text-[0.64rem] uppercase tracking-[0.1em] text-sage/45 rtl:tracking-normal rtl:text-[0.7rem]">
                    {t('common.location')}
                  </dt>
                  <dd className="text-xs text-sage/85">{t('home.hero.locationLabel')}</dd>
                </div>
                <div className="grid grid-cols-[1fr_1.4fr] gap-3 py-3">
                  <dt className="text-[0.64rem] uppercase tracking-[0.1em] text-sage/45 rtl:tracking-normal rtl:text-[0.7rem]">
                    {t('common.pending')}
                  </dt>
                  <dd className="text-xs text-sage/70">{t('home.clinic.status')}</dd>
                </div>
              </dl>
              <p className="mt-4 flex items-start gap-2 text-[0.68rem] leading-relaxed text-sage/50">
                <ShieldAlert className="mt-0.5 h-3.5 w-3.5 flex-none text-gold/70" aria-hidden="true" />
                {t('home.clinic.addressNote')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
