import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Lock,
  MapPin,
  MessageCircle,
  Phone,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { doctor } from '../data/doctor.js';
import { FacebookIcon } from '../components/common/icons.jsx';
import useLanguage from '../hooks/useLanguage.js';
import Seo from '../components/common/Seo.jsx';
import PageIntro from '../components/common/PageIntro.jsx';
import { PrecisionArcs } from '../components/art/AnatomyArt.jsx';
import { buildPhysicianSchema } from '../utils/seo.js';

const expectationIcons = [Phone, ShieldAlert, Lock];

export default function Contact() {
  const { t } = useTranslation();
  const { path, lang } = useLanguage();
  const expectations = t('contact.expectations.items', { returnObjects: true });
  const emergencySigns = t('contact.emergency.signs', { returnObjects: true });

  return (
    <>
      <Seo
        page="contact"
        jsonLd={buildPhysicianSchema({
          lang,
          roleFull: t('brand.roleFull'),
          affiliation: t('home.hero.affiliationValue'),
        })}
      />
      <PageIntro
        eyebrow={t('contact.intro.eyebrow')}
        title={t('contact.intro.title')}
        lead={t('contact.intro.lead')}
        breadcrumb={[
          { label: t('nav.home'), to: path('/') },
          { label: t('contact.intro.breadcrumb') },
        ]}
      />

      <section className="pb-16 md:pb-24">
        <div className="container-editorial">
          <div className="grid gap-5 lg:grid-cols-12">
            <div className="relative overflow-hidden bg-forest p-6 text-paper sm:p-9 lg:col-span-7">
              <PrecisionArcs
                className="pointer-events-none absolute -bottom-32 -end-28 w-[28rem] text-sage/[0.08]"
              />
              <div className="relative">
                <p className="eyebrow !text-sage">{t('contact.phone.eyebrow')}</p>
                <h2 className="display-md mt-4 !text-paper">{t('contact.phone.heading')}</h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-sage/65">
                  {t('contact.phone.note')}
                </p>

                <div className="mt-8 border-t border-paper/20 pt-5">
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-sage/45 rtl:tracking-normal rtl:text-[0.68rem]">
                    {t('contact.phone.label')}
                  </p>
                  <a
                    href={doctor.phone.tel}
                    dir="ltr"
                    className="number-ltr mt-2 block font-display text-[clamp(2.1rem,5.5vw,4rem)] leading-none text-paper transition-colors hover:text-sage"
                  >
                    {doctor.phone.display}
                  </a>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <a href={doctor.phone.tel} className="btn btn-light">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {t('contact.phone.action')}
                  </a>
                  <span className="inline-flex items-center gap-2 text-[0.68rem] text-sage/50">
                    <ShieldCheck className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                    {t('contact.phone.label')}
                  </span>
                </div>

                <p className="mt-7 border-t border-paper/15 pt-4 text-[0.7rem] leading-relaxed text-sage/45">
                  {t('contact.phone.availability')}
                </p>
              </div>
            </div>

            <div className="grid gap-5 lg:col-span-5">
              <div className="border border-line bg-paper p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-stone/60 text-forest">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="border border-gold/30 bg-gold/[0.08] px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-forest/70 rtl:tracking-normal rtl:text-[0.66rem]">
                    {t('contact.whatsapp.status')}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl text-forest">{t('contact.whatsapp.heading')}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{t('contact.whatsapp.body')}</p>
                <a
                  href={doctor.phone.tel}
                  className="mt-4 inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-forest underline decoration-forest/25 underline-offset-4 transition-colors hover:text-teal"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  {t('contact.whatsapp.fallback')}
                </a>
                <p className="mt-3 border-t border-line pt-3 text-[0.65rem] leading-relaxed text-muted/65">
                  {t('contact.whatsapp.note')}
                </p>
              </div>

              <div className="relative overflow-hidden border border-teal/15 bg-mint p-6 sm:p-7">
                <div className="absolute inset-0 grid-paper opacity-60" aria-hidden="true" />
                <div className="relative">
                  <p className="eyebrow">{t('contact.location.eyebrow')}</p>
                  <h3 className="mt-3 font-display text-2xl leading-tight text-forest">
                    {t('contact.location.clinic')}
                  </h3>
                  <p className="mt-1 flex items-center gap-2 text-xs font-semibold text-teal">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {t('contact.location.city')}
                  </p>
                  <p className="mt-3 max-w-xs text-[0.7rem] leading-relaxed text-muted">
                    {t('contact.location.note')}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1.5 border border-forest/12 bg-paper/70 px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.07em] text-muted rtl:tracking-normal rtl:text-[0.65rem]">
                    <ShieldAlert className="h-3 w-3 text-gold" aria-hidden="true" />
                    {t('contact.location.status')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad-sm border-y border-line bg-paper">
        <div className="container-editorial">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <p className="eyebrow">{t('contact.facebook.eyebrow')}</p>
              <h2 className="display-md mt-4">{t('contact.facebook.heading')}</h2>
              <p className="mt-4 max-w-sm text-xs leading-relaxed text-muted">
                {t('contact.facebook.body')}
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <a
                href={doctor.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 border border-line bg-ivory p-5 transition-colors hover:border-forest/35 hover:bg-mint/50 sm:p-6"
              >
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-forest text-paper">
                  <FacebookIcon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-xl text-forest">{t('contact.facebook.link')}</span>
                    <span className="inline-flex items-center gap-1 text-[0.55rem] font-semibold uppercase tracking-[0.07em] text-teal rtl:tracking-normal rtl:text-[0.63rem]">
                      <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                      {t('contact.facebook.verified')}
                    </span>
                  </span>
                  <span className="mt-1 block truncate text-xs text-muted" dir="ltr">
                    facebook.com/DrKhalidkhanzadran
                  </span>
                </span>
                <ArrowUpRight
                  className="directional-icon h-5 w-5 flex-none text-forest transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-line bg-stone/35">
        <div className="container-editorial">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">{t('contact.expectations.eyebrow')}</p>
              <h2 className="display-lg mt-5">{t('contact.expectations.heading')}</h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="border-t border-forest/15">
                {Array.isArray(expectations) &&
                  expectations.map((item, index) => {
                    const Icon = expectationIcons[index] ?? Phone;
                    return (
                      <li
                        key={item.title}
                        className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-forest/15 py-5 sm:grid-cols-[3rem_0.8fr_1.4fr] sm:items-baseline"
                      >
                        <span className="flex h-9 w-9 items-center justify-center border border-forest/15 text-teal">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <h3 className="font-display text-xl leading-tight text-forest">{item.title}</h3>
                        <p className="col-start-2 text-xs leading-relaxed text-muted sm:col-start-3">
                          {item.body}
                        </p>
                      </li>
                    );
                  })}
              </ul>
              <p className="mt-5 text-xs leading-relaxed text-muted/65">{t('contact.expectations.note')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-emergency-bg">
        <div className="container-editorial py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="eyebrow !text-emergency">
                <ShieldAlert className="h-4 w-4" aria-hidden="true" />
                {t('contact.emergency.eyebrow')}
              </p>
              <h2 className="display-lg mt-5 !text-emergency">{t('contact.emergency.heading')}</h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-emergency/80">
                {t('contact.emergency.body')}
              </p>
              <p className="mt-4 max-w-xl text-sm font-semibold leading-relaxed text-emergency">
                {t('contact.emergency.action')}
              </p>
              <Link
                to={path('/patient-guide#emergency')}
                className="mt-6 inline-flex min-h-11 items-center gap-2 border border-emergency/30 bg-paper/60 px-4 text-xs font-semibold text-emergency transition-colors hover:bg-paper"
              >
                {t('patientGuide.emergency.eyebrow')}
                <ArrowUpRight className="directional-icon h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <ul className="border-t border-emergency/25">
                {Array.isArray(emergencySigns) &&
                  emergencySigns.map((sign) => (
                    <li
                      key={sign}
                      className="flex items-start gap-3 border-b border-emergency/20 py-3 text-xs leading-relaxed text-emergency/85"
                    >
                      <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-emergency" aria-hidden="true" />
                      {sign}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
