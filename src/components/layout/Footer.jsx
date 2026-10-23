import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, ShieldCheck } from 'lucide-react';
import { FacebookIcon } from '../common/icons.jsx';
import { doctor } from '../../data/doctor.js';
import { navigation } from '../../data/navigation.js';
import { localizedPath, LANGUAGES } from '../../utils/localizedPath.js';
import { buildWhatsAppUrl } from '../../utils/contact.js';
import LanguageSwitcher from './LanguageSwitcher.jsx';

export default function Footer({ lang }) {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <footer className="bg-forest text-paper">
      <div className="container-editorial">
        <div className="grid gap-10 border-b border-paper/15 py-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              to={localizedPath('/', lang)}
              className="inline-flex items-center gap-3"
            >
              <span
                dir="ltr"
                className="flex h-11 w-11 flex-none items-center justify-center border border-paper/30"
              >
                <img
                  src="/logo-inverse.svg"
                  alt=""
                  aria-hidden="true"
                  width="44"
                  height="44"
                  loading="lazy"
                  decoding="async"
                  className="h-8 w-8"
                />
              </span>
              <span>
                <span className="block font-display text-2xl leading-tight">{t('brand.name')}</span>
                <span className="mt-1 block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-sage/75 rtl:tracking-normal rtl:text-[0.75rem]">
                  {t('brand.roleFull')}
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-sage/75">
              {t('footer.description')}
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] text-gold">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              {t('brand.tagline')}
            </p>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-sage/60 rtl:tracking-normal rtl:text-[0.78rem]">
              {t('footer.navigationTitle')}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navigation.map((item) => (
                <li key={item.id}>
                  <Link
                    to={localizedPath(item.path, lang)}
                    className="text-sm text-sage/85 transition-colors hover:text-paper"
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-sage/60 rtl:tracking-normal rtl:text-[0.78rem]">
              {t('footer.contactTitle')}
            </h2>
            <address className="mt-4 space-y-3 not-italic">
              <p className="flex gap-2.5 text-sm leading-relaxed text-sage/85">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-gold" aria-hidden="true" />
                <span>
                  {t('home.hero.affiliationValue')}
                  <br />
                  {t('home.hero.locationLabel')}
                </span>
              </p>
              <p className="flex gap-2.5 text-sm text-sage/85">
                <Phone className="mt-0.5 h-4 w-4 flex-none text-gold" aria-hidden="true" />
                <a
                  href={doctor.phone.tel}
                  className="number-ltr transition-colors hover:text-paper"
                  dir="ltr"
                >
                  {doctor.phone.display}
                </a>
              </p>
              {whatsappUrl ? (
                <p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-sage/85 underline decoration-sage/30 underline-offset-4 hover:text-paper"
                  >
                    {t('common.whatsapp')}
                  </a>
                </p>
              ) : (
                <p className="text-xs leading-relaxed text-sage/55">
                  {t('common.whatsappPendingShort')}
                </p>
              )}
              {doctor.facebook.verified && (
                <p>
                  <a
                    href={doctor.facebook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('footer.facebookAria')}
                    className="inline-flex items-center gap-2 text-sm text-sage/85 transition-colors hover:text-paper"
                  >
                    <FacebookIcon className="h-4 w-4" />
                    <span>{t('about.biography.facebookLink')}</span>
                  </a>
                </p>
              )}
            </address>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-sage/60 rtl:tracking-normal rtl:text-[0.78rem]">
              {t('footer.languageTitle')}
            </h2>
            <LanguageSwitcher lang={lang} tone="dark" className="mt-2 flex flex-wrap" />
            <p className="mt-5 text-xs leading-relaxed text-sage/55">
              {t('footer.legalTitle')}
            </p>
            <Link
              to={localizedPath('/privacy', lang)}
              className="mt-2 inline-block border-b border-sage/30 pb-0.5 text-sm text-sage/85 transition-colors hover:border-paper hover:text-paper"
            >
              {t('footer.privacy')}
            </Link>
          </div>
        </div>

        <div className="grid gap-6 py-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-sage/60 rtl:tracking-normal rtl:text-[0.78rem]">
              {t('footer.disclaimerTitle')}
            </h2>
            <p className="mt-3 max-w-3xl text-xs leading-relaxed text-sage/60">
              {t('footer.disclaimer')}
            </p>
            <p className="mt-2 text-xs font-semibold text-sage/80">{t('footer.emergency')}</p>
            {lang !== 'en' && (
              <p className="mt-3 max-w-2xl text-xs leading-relaxed text-gold/85">
                {t('footer.translationReview', {
                  language: LANGUAGES.find((item) => item.code === lang)?.label,
                })}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 text-xs text-sage/50 lg:col-span-4 lg:items-end lg:text-end">
            <p>{t('footer.copyright', { year })}</p>
            <p>{t('footer.editorialNote')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
