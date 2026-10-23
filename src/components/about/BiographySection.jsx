import { useTranslation } from 'react-i18next';
import { ExternalLink, MapPin, Phone } from 'lucide-react';
import { doctor } from '../../data/doctor.js';
import DoctorPortrait from '../../components/common/DoctorPortrait.jsx';
import { doctorPortraits } from '../../data/clientImages.js';

export default function BiographySection() {
  const { t } = useTranslation();

  return (
    <section className="pb-16 md:pb-24">
      <div className="container-editorial">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <DoctorPortrait image={doctorPortraits.office} />
            <dl className="mt-7 border-t border-line">
              {[
                [t('about.biography.facts.name'), t('brand.name')],
                [t('about.biography.facts.role'), t('brand.roleFull')],
                [t('about.biography.facts.based'), t('home.hero.locationLabel')],
                [t('about.biography.facts.affiliation'), t('home.hero.affiliationValue')],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-[0.8fr_1.2fr] gap-4 border-b border-line py-3">
                  <dt className="text-[0.64rem] uppercase tracking-[0.1em] text-muted/65 rtl:tracking-normal rtl:text-[0.72rem]">
                    {label}
                  </dt>
                  <dd className="text-xs leading-relaxed text-forest">{value}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[0.8fr_1.2fr] gap-4 border-b border-line py-3">
                <dt className="text-[0.64rem] uppercase tracking-[0.1em] text-muted/65 rtl:tracking-normal rtl:text-[0.72rem]">
                  {t('about.biography.facts.phone')}
                </dt>
                <dd>
                  <a
                    href={doctor.phone.tel}
                    dir="ltr"
                    className="number-ltr inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:text-teal"
                  >
                    <Phone className="h-3 w-3 text-gold" aria-hidden="true" />
                    {doctor.phone.display}
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[0.8fr_1.2fr] gap-4 py-3">
                <dt className="text-[0.64rem] uppercase tracking-[0.1em] text-muted/65 rtl:tracking-normal rtl:text-[0.72rem]">
                  {t('about.biography.facts.publicProfile')}
                </dt>
                <dd>
                  <a
                    href={doctor.facebook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest underline decoration-forest/25 underline-offset-4 hover:text-teal"
                  >
                    Facebook
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </dd>
              </div>
            </dl>
            <div className="mt-4 flex items-start gap-2 text-[0.68rem] leading-relaxed text-muted/65">
              <MapPin className="mt-0.5 h-3.5 w-3.5 flex-none text-gold" aria-hidden="true" />
              <span>{t('about.biography.statusValue')}</span>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <p className="eyebrow">{t('about.biography.eyebrow')}</p>
            <h2 className="display-lg mt-5">{t('about.biography.heading')}</h2>
            <div className="prose-editorial mt-8 max-w-2xl">
              <p className="text-[1.02rem]">{t('about.biography.p1')}</p>
              <p>{t('about.biography.p2')}</p>
              <p>{t('about.biography.p3')}</p>
              <p>{t('about.biography.p4')}</p>
            </div>
            <div className="mt-8 flex flex-wrap items-start gap-x-8 gap-y-4 border-t border-line pt-5">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.12em] text-muted/60 rtl:tracking-normal rtl:text-[0.7rem]">
                  {t('about.biography.facts.status')}
                </p>
                <p className="mt-1 max-w-md text-xs leading-relaxed text-forest/80">
                  {t('about.biography.statusValue')}
                </p>
              </div>
              <a
                href={doctor.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-forest underline decoration-forest/25 underline-offset-4 hover:text-teal"
              >
                {t('about.biography.facebookLink')}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
