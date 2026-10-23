import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Home, Phone } from 'lucide-react';
import { doctor } from '../data/doctor.js';
import { navigation } from '../data/navigation.js';
import useLanguage from '../hooks/useLanguage.js';
import Seo from '../components/common/Seo.jsx';
import { PrecisionArcs } from '../components/art/AnatomyArt.jsx';

export default function NotFound() {
  const { t } = useTranslation();
  const { path } = useLanguage();

  return (
    <>
      <Seo page="notFound" />
      <section className="relative overflow-hidden border-b border-line">
        <PrecisionArcs className="pointer-events-none absolute -end-44 top-0 w-[38rem] text-teal/[0.06]" />
        <div className="container-editorial relative py-16 md:py-24">
          <p className="eyebrow">{t('notFound.eyebrow')}</p>
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <span
                aria-hidden="true"
                className="block font-display text-[clamp(7rem,18vw,14rem)] leading-[0.8] tracking-[-0.05em] text-forest/[0.08]"
              >
                404
              </span>
              <span className="mt-6 hidden h-px w-24 bg-gold lg:block" aria-hidden="true" />
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <h1 className="display-lg">{t('notFound.title')}</h1>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">{t('notFound.body')}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to={path('/')} className="btn btn-primary">
                  <Home className="h-4 w-4" aria-hidden="true" />
                  {t('notFound.home')}
                </Link>
                <a href={doctor.phone.tel} className="btn btn-outline">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {t('notFound.contact')}
                </a>
              </div>

              <div className="mt-12 border-t border-line pt-6">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted/60 rtl:tracking-normal rtl:text-[0.7rem]">
                  {t('notFound.linksLabel')}
                </p>
                <ul className="mt-3 grid gap-x-8 sm:grid-cols-2">
                  {navigation.map((item) => (
                    <li key={item.id} className="border-b border-line">
                      <Link
                        to={path(item.path)}
                        className="group flex items-center justify-between gap-3 py-3 text-sm text-muted transition-colors hover:text-forest"
                      >
                        {t(item.labelKey)}
                        <ArrowUpRight
                          className="directional-icon h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
