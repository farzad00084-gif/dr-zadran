import { useTranslation } from 'react-i18next';
import { ArrowDown, MapPin, Phone } from 'lucide-react';
import { doctor } from '../../data/doctor.js';
import { Link } from 'react-router-dom';
import useLanguage from '../../hooks/useLanguage.js';
import DoctorPortrait from '../common/DoctorPortrait.jsx';
import Button from '../common/Button.jsx';
import { PrecisionArcs } from '../art/AnatomyArt.jsx';
import { doctorPortraits } from '../../data/clientImages.js';

export default function HomeHero() {
  const { t } = useTranslation();
  const { path } = useLanguage();
  const nameWords = t('home.hero.name').split(' ');
  const lastWord = nameWords.pop();
  const firstWords = nameWords.join(' ');

  return (
    <section className="relative overflow-hidden border-b border-line/70">
      <PrecisionArcs
        className="pointer-events-none absolute -top-48 -start-52 w-[42rem] text-teal/[0.055]"
      />
      <div className="container-editorial relative">
        <div className="grid gap-10 pb-12 pt-8 md:pb-16 md:pt-12 lg:grid-cols-12 lg:gap-8 lg:pb-20">
          <div className="flex flex-col lg:col-span-7">
            <div className="hero-reveal flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <p className="eyebrow">{t('home.hero.eyebrow')}</p>
              <span className="number-ltr text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-muted/70">
                KABUL · AF / 2026
              </span>
            </div>

            <div className="pt-8 md:pt-10">
              <p className="hero-reveal hero-reveal-delay-1 mb-3 text-sm font-semibold tracking-[0.06em] text-muted rtl:tracking-normal rtl:text-base">
                {t('home.hero.namePrefix')}
              </p>
              <h1 className="display-xl">
                <span className="hero-reveal hero-reveal-delay-1 block">{firstWords}</span>
                <span className="hero-reveal hero-reveal-delay-2 display-italic block">{lastWord}</span>
              </h1>
              <p className="hero-reveal hero-reveal-delay-2 mt-6 max-w-2xl text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-teal rtl:tracking-normal rtl:text-sm">
                {t('home.hero.role')}
              </p>
            </div>

            <div className="hero-reveal hero-reveal-delay-3 mt-8 grid gap-6 border-t border-line pt-6 md:grid-cols-12">
              <h2 className="font-display text-[clamp(1.55rem,2.7vw,2.15rem)] leading-tight text-forest md:col-span-7">
                {t('home.hero.statement')}{' '}
                <em className="text-teal">{t('home.hero.statementItalic')}</em>
              </h2>
              <p className="text-sm leading-relaxed text-muted md:col-span-5">{t('home.hero.intro')}</p>
            </div>

            <div className="hero-reveal hero-reveal-delay-4 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button to={path('/contact')} showArrow>
                {t('home.hero.primary')}
              </Button>
              <Button to={path('/expertise')} variant="outline">
                {t('home.hero.secondary')}
              </Button>
            </div>
          </div>

          <div className="portrait-reveal mx-auto w-full max-w-[440px] lg:col-span-5 lg:ms-auto lg:max-w-none">
            <DoctorPortrait image={doctorPortraits.hero} />
          </div>
        </div>

        <div className="grid gap-0 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: t('home.hero.affiliationLabel'),
              value: t('home.hero.affiliationValue'),
            },
            {
              label: t('common.location'),
              value: t('home.hero.locationLabel'),
              icon: MapPin,
            },
            {
              label: t('home.hero.contactLabel'),
              value: doctor.phone.display,
              href: doctor.phone.tel,
              icon: Phone,
            },
            {
              label: t('home.hero.statusLabel'),
              value: t('home.hero.statusValue'),
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-start gap-3 border-b border-line py-4 sm:border-e sm:last:border-e-0 lg:border-b-0 lg:px-5 lg:first:ps-0"
              >
                {Icon ? <Icon className="mt-0.5 h-4 w-4 flex-none text-gold" aria-hidden="true" /> : (
                  <span className="number-ltr mt-0.5 text-[0.62rem] font-semibold text-gold" aria-hidden="true">
                    0{index + 1}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-muted/75 rtl:tracking-normal rtl:text-[0.68rem]">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      dir="ltr"
                      className="number-ltr mt-1 block text-sm font-semibold text-forest transition-colors hover:text-teal"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-semibold text-forest">{item.value}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between py-5">
          <a
            href="#introduction"
            className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-muted transition-colors hover:text-forest"
          >
            <ArrowDown className="scroll-cue h-3.5 w-3.5" aria-hidden="true" />
            {t('home.hero.scroll')}
          </a>
          <span className="hidden text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted/50 sm:block">
            {t('brand.tagline')}
          </span>
        </div>
      </div>
    </section>
  );
}
