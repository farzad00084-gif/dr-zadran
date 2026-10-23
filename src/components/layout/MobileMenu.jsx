import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Phone, X } from 'lucide-react';
import { doctor } from '../../data/doctor.js';
import { navigation } from '../../data/navigation.js';
import { localizedPath } from '../../utils/localizedPath.js';
import LanguageSwitcher from './LanguageSwitcher.jsx';

export default function MobileMenu({ open, onClose, lang }) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const clearPath = pathname.replace(/^\/(fa|ps)(?=\/|$)/, '') || '/';

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusables = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      id="mobile-navigation"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={t('header.menuTitle')}
      className="fixed inset-0 z-[100] overflow-y-auto bg-forest text-paper"
    >
      <div className="container-editorial flex min-h-full flex-col py-4">
        <div className="flex items-center justify-between gap-4 border-b border-paper/15 pb-4">
          <span className="font-display text-xl text-paper">{t('brand.name')}</span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t('header.closeMenu')}
            className="inline-flex h-11 w-11 items-center justify-center border border-paper/30 text-paper transition-colors hover:bg-paper hover:text-forest"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label={t('header.primaryNavigation')} className="flex-1 py-8">
          <p className="eyebrow !text-sage">{t('header.menuTitle')}</p>
          <ul className="mt-6">
            {navigation.map((item, index) => (
              <li key={item.id} className="border-b border-paper/12">
                <Link
                  to={localizedPath(item.path, lang)}
                  onClick={onClose}
                  aria-current={
                    item.path === '/'
                      ? clearPath === '/'
                        ? 'page'
                        : undefined
                      : clearPath === item.path || clearPath.startsWith(`${item.path}/`)
                        ? 'page'
                        : undefined
                  }
                  className="group flex items-center justify-between gap-4 py-4 font-display text-[2rem] leading-tight text-paper transition-colors hover:text-sage"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="number-ltr font-sans text-[0.68rem] font-semibold tracking-[0.14em] text-sage/65">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {t(item.labelKey)}
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 flex-none text-sage/50 transition-transform group-hover:translate-x-1 group-hover:text-sage"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-paper/15 py-6">
          <LanguageSwitcher lang={lang} tone="dark" className="mb-6 flex" />
          <a href={doctor.phone.tel} className="btn btn-light w-full">
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span dir="ltr">{doctor.phone.display}</span>
          </a>
          <p className="mt-4 text-center text-xs leading-relaxed text-sage/70">
            {t('common.clinicalAffiliation')}: {t('home.hero.affiliationValue')} ·{' '}
            {t('home.hero.locationLabel')}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
