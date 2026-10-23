import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Phone } from 'lucide-react';
import { doctor } from '../../data/doctor.js';
import { navigation } from '../../data/navigation.js';
import { localizedPath } from '../../utils/localizedPath.js';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import MobileMenu from './MobileMenu.jsx';

export default function Header({ lang }) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const clearPath = pathname.replace(/^\/(fa|ps)(?=\/|$)/, '') || '/';
  const isActive = (path) => {
    if (path === '/') return clearPath === '/';
    return clearPath === path || clearPath.startsWith(`${path}/`);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled
            ? 'border-line bg-ivory/95 shadow-[0_10px_30px_-24px_rgba(24,60,56,0.55)] backdrop-blur-md'
            : 'border-transparent bg-ivory/80 backdrop-blur-sm'
        }`}
      >
        <div className="container-editorial">
          <div className="flex h-[76px] items-center justify-between gap-4">
            <Link
              to={localizedPath('/', lang)}
              className="group flex min-w-0 items-center gap-3"
            >
              <span
                dir="ltr"
                className="flex h-10 w-10 flex-none items-center justify-center border border-forest/25 font-display text-lg leading-none text-forest transition-colors group-hover:border-gold group-hover:text-teal"
              >
                KZ
              </span>
              <span className="min-w-0">
                <span className="block truncate font-display text-[1.18rem] leading-tight text-forest sm:text-[1.35rem]">
                  {t('brand.name')}
                </span>
                <span className="mt-0.5 block truncate text-[0.63rem] font-semibold uppercase tracking-[0.14em] text-muted rtl:tracking-normal rtl:text-[0.7rem]">
                  {t('brand.role')}
                </span>
              </span>
            </Link>

            <nav
              aria-label={t('header.primaryNavigation')}
              className="hidden items-center gap-6 xl:flex"
            >
              {navigation.map((item) => (
                <Link
                  key={item.id}
                  to={localizedPath(item.path, lang)}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                  className={`relative py-2 text-[0.78rem] font-semibold tracking-[0.045em] transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-center after:bg-gold after:transition-transform rtl:tracking-normal rtl:text-[0.86rem] ${
                    isActive(item.path)
                      ? 'text-forest after:scale-x-100'
                      : 'text-muted after:scale-x-0 hover:text-forest hover:after:scale-x-100'
                  }`}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageSwitcher className="hidden lg:flex" lang={lang} />
              <a
                href={doctor.phone.tel}
                className="btn btn-primary hidden min-[420px]:inline-flex xl:hidden"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>{t('header.callClinic')}</span>
              </a>
              <a
                href={doctor.phone.tel}
                className="btn btn-primary hidden xl:inline-flex"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>{t('header.callClinic')}</span>
              </a>
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                aria-label={t('header.openMenu')}
                className="inline-flex h-11 w-11 items-center justify-center border border-forest/20 text-forest transition-colors hover:border-forest hover:bg-paper xl:hidden"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu
        open={menuOpen}
        onClose={() => {
          setMenuOpen(false);
          menuButtonRef.current?.focus();
        }}
        lang={lang}
      />
    </>
  );
}
