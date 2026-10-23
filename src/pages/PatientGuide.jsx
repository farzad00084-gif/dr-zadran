import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  FileText,
  ListChecks,
  MapPin,
  Pill,
  ScanLine,
  ShieldAlert,
  Stethoscope,
} from 'lucide-react';
import { doctor } from '../data/doctor.js';
import useLanguage from '../hooks/useLanguage.js';
import Seo from '../components/common/Seo.jsx';
import PageIntro from '../components/common/PageIntro.jsx';
import { WhatsAppAction } from '../components/common/ContactAction.jsx';
import FaqList from '../components/patient/FaqList.jsx';
import ContactBand from '../components/common/ContactBand.jsx';
import EditorialPhoto from '../components/common/EditorialPhoto.jsx';
import { editorialImages } from '../data/editorialImages.js';
import { buildPhysicianSchema } from '../utils/seo.js';

const prepareIcons = [FileText, Pill, ScanLine, ListChecks, Stethoscope];

export default function PatientGuide() {
  const { t } = useTranslation();
  const { path, lang } = useLanguage();
  const prepareItems = t('patientGuide.prepare.items', { returnObjects: true });
  const consultationSteps = t('patientGuide.consultation.steps', { returnObjects: true });
  const faqItems = t('patientGuide.faq.items', { returnObjects: true });
  const emergencySigns = t('patientGuide.emergency.signs', { returnObjects: true });

  return (
    <>
      <Seo
        page="patientGuide"
        jsonLd={buildPhysicianSchema({
          lang,
          roleFull: t('brand.roleFull'),
          affiliation: t('home.hero.affiliationValue'),
        })}
      />
      <PageIntro
        eyebrow={t('patientGuide.intro.eyebrow')}
        title={t('patientGuide.intro.title')}
        lead={t('patientGuide.intro.lead')}
        breadcrumb={[
          { label: t('nav.home'), to: path('/') },
          { label: t('patientGuide.intro.breadcrumb') },
        ]}
      >
        <Link
          to={path('/patient-guide#emergency')}
          className="inline-flex items-center gap-2 border border-emergency/25 bg-emergency-bg px-3 py-2 text-xs font-semibold text-emergency transition-colors hover:border-emergency/50"
        >
          <ShieldAlert className="h-4 w-4" aria-hidden="true" />
          {t('patientGuide.intro.pill')}
        </Link>
        <p className="mt-4 text-xs leading-relaxed text-muted">{t('patientGuide.intro.note')}</p>
      </PageIntro>

      <section className="pb-16 md:pb-24">
        <div className="container-editorial">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">{t('patientGuide.contact.eyebrow')}</p>
              <h2 className="display-lg mt-5">{t('patientGuide.contact.heading')}</h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
                {t('patientGuide.contact.body')}
              </p>
              <p className="mt-5 text-xs leading-relaxed text-muted/70">
                {t('patientGuide.contact.whatsapp')}
              </p>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <div className="border border-line bg-paper p-6 shadow-paper sm:p-8">
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted/60 rtl:tracking-normal rtl:text-[0.7rem]">
                    {t('patientGuide.contact.phoneLabel')}
                  </p>
                  <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden="true" />
                </div>
                <a
                  href={doctor.phone.tel}
                  dir="ltr"
                  className="number-ltr mt-4 block font-display text-[clamp(2rem,5vw,3.1rem)] leading-none text-forest transition-colors hover:text-teal"
                >
                  {doctor.phone.display}
                </a>
                <a href={doctor.phone.tel} className="btn btn-primary mt-5 w-full">
                  {t('patientGuide.contact.call')}
                </a>
                <WhatsAppAction showPending className="mt-3" />
                <address className="mt-6 space-y-3 border-t border-line pt-5 not-italic">
                  <p className="flex items-start gap-2.5 text-xs leading-relaxed text-forest">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 flex-none text-gold" aria-hidden="true" />
                    {t('patientGuide.contact.address')}
                  </p>
                </address>
                <p className="mt-4 border-t border-line pt-4 text-[0.7rem] leading-relaxed text-muted">
                  {t('patientGuide.contact.appointmentNote')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-line bg-stone/35">
        <div className="container-editorial">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">{t('patientGuide.prepare.eyebrow')}</p>
              <h2 className="display-lg mt-5">{t('patientGuide.prepare.heading')}</h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
                {t('patientGuide.prepare.intro')}
              </p>
              <p className="mt-5 border-s-2 border-gold ps-4 text-xs leading-relaxed text-muted/75">
                {t('patientGuide.prepare.note')}
              </p>
              <EditorialPhoto
                image={editorialImages.hospitalInterior}
                aspect="aspect-[4/3]"
                sizes="(min-width: 1024px) 360px, 80vw"
                notClinic
                className="mt-8 max-w-[360px]"
              />
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="grid border-s border-t border-forest/15 sm:grid-cols-2">
                {Array.isArray(prepareItems) &&
                  prepareItems.map((item, index) => {
                    const Icon = prepareIcons[index] ?? FileText;
                    return (
                      <li
                        key={item.title}
                        className={`flex min-h-[170px] flex-col border-b border-e border-forest/15 p-5 ${
                          index === 4 ? 'sm:col-span-2' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <Icon className="h-4 w-4 text-teal" aria-hidden="true" />
                          <span className="number-ltr text-[0.58rem] font-semibold text-gold">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <h3 className="mt-4 font-display text-xl leading-tight text-forest">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-muted">{item.body}</p>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="consultation" className="section-pad scroll-mt-28">
        <div className="container-editorial">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">{t('patientGuide.consultation.eyebrow')}</p>
              <h2 className="display-lg mt-5">{t('patientGuide.consultation.heading')}</h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
                {t('patientGuide.consultation.intro')}
              </p>
              <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-muted/65">
                {t('patientGuide.consultation.note')}
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <ol className="border-t border-line">
                {Array.isArray(consultationSteps) &&
                  consultationSteps.map((step, index) => (
                    <li
                      key={step.title}
                      className="grid grid-cols-[2.25rem_1fr] gap-4 border-b border-line py-5 sm:grid-cols-[2.75rem_0.8fr_1.4fr] sm:items-baseline sm:gap-5 sm:py-6"
                    >
                      <span className="number-ltr text-[0.64rem] font-semibold text-gold">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-xl leading-tight text-forest">{step.title}</h3>
                      <p className="col-start-2 text-sm leading-relaxed text-muted sm:col-start-3">
                        {step.body}
                      </p>
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="container-editorial py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">{t('patientGuide.faq.eyebrow')}</p>
              <h2 className="display-lg mt-5">{t('patientGuide.faq.heading')}</h2>
              <p className="mt-6 max-w-sm text-xs leading-relaxed text-muted/70">
                {t('patientGuide.faq.note')}
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <FaqList items={faqItems} />
            </div>
          </div>
        </div>
      </section>

      <section
        id="emergency"
        aria-labelledby="emergency-heading"
        className="relative scroll-mt-28 border-b border-emergency/15 bg-emergency-bg"
      >
        <div className="container-editorial py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <p className="eyebrow !text-emergency">
                <ShieldAlert className="h-4 w-4" aria-hidden="true" />
                {t('patientGuide.emergency.eyebrow')}
              </p>
              <h2 id="emergency-heading" className="display-lg mt-5 !text-emergency">
                {t('patientGuide.emergency.heading')}
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-relaxed text-emergency/80">
                {t('patientGuide.emergency.body')}
              </p>
              <div className="mt-7 border border-emergency/25 bg-paper/60 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-emergency rtl:tracking-normal rtl:text-[0.78rem]">
                  {t('patientGuide.emergency.signsTitle')}
                </p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {Array.isArray(emergencySigns) &&
                    emergencySigns.map((sign) => (
                      <li
                        key={sign}
                        className="flex items-start gap-2 text-xs leading-relaxed text-emergency/85"
                      >
                        <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-emergency" aria-hidden="true" />
                        {sign}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="border border-emergency/25 bg-paper p-6 sm:p-8">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-emergency rtl:tracking-normal rtl:text-[0.7rem]">
                  {t('common.emergency')}
                </p>
                <p className="mt-4 font-display text-2xl leading-snug text-emergency">
                  {t('patientGuide.emergency.action')}
                </p>
                <p className="mt-5 border-t border-emergency/15 pt-4 text-xs leading-relaxed text-muted">
                  {t('patientGuide.emergency.note')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactBand
        eyebrow={t('patientGuide.contact.eyebrow')}
        title={t('patientGuide.cta.heading')}
        body={t('patientGuide.cta.body')}
        primaryLabel={t('patientGuide.cta.call')}
        secondary={{ label: t('patientGuide.cta.contact'), to: '/contact' }}
      />
    </>
  );
}
