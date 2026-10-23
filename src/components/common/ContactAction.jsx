import { useTranslation } from 'react-i18next';
import { MessageCircle, Phone } from 'lucide-react';
import { doctor } from '../../data/doctor.js';
import { buildWhatsAppUrl } from '../../utils/contact.js';
import { Link } from 'react-router-dom';

export function PhoneLink({ variant = 'button', label, className = '', showNumber = true }) {
  const { t } = useTranslation();
  const text = label ?? t('common.callClinic');
  if (variant === 'text') {
    return (
      <a
        href={doctor.phone.tel}
        className={`inline-flex min-h-11 items-center gap-2 text-forest transition-colors hover:text-teal ${className}`}
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        <span>{text}</span>
        {showNumber ? (
          <span className="number-ltr text-sm text-muted" dir="ltr">
            {doctor.phone.display}
          </span>
        ) : null}
      </a>
    );
  }
  return (
    <a
      href={doctor.phone.tel}
      className={`btn btn-primary ${className}`}
      aria-label={t('header.callClinicAria', { phone: doctor.phone.display })}
    >
      <Phone className="h-4 w-4" aria-hidden="true" />
      <span>{text}</span>
    </a>
  );
}

export function WhatsAppAction({ showPending = false, className = '' }) {
  const { t } = useTranslation();
  const url = buildWhatsAppUrl();

  if (!url) {
    if (!showPending) return null;
    return (
      <div className={`border border-line bg-stone/40 p-4 ${className}`}>
        <p className="flex items-center gap-2 text-sm font-semibold text-forest">
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          {t('common.whatsapp')}
          <span className="text-[0.68rem] font-medium text-muted">— {t('common.pending')}</span>
        </p>
        <p className="mt-2 text-xs leading-relaxed text-muted">{t('common.whatsappPendingNote')}</p>
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-outline ${className}`}
      aria-label={`${t('common.whatsapp')} (${t('common.opensInNewTab')})`}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      <span>{t('common.whatsapp')}</span>
    </a>
  );
}

export function EmergencyInline({ className = '' }) {
  const { t } = useTranslation();
  return (
    <div className={`border-s-2 border-emergency bg-emergency-bg px-4 py-3 ${className}`}>
      <p className="text-xs font-bold uppercase tracking-[0.08em] text-emergency rtl:tracking-normal rtl:text-[0.8rem]">
        {t('common.emergency')}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-emergency/90">{t('common.emergencyAction')}</p>
    </div>
  );
}

export function ContactStrip({ lang = 'en' }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
      <PhoneLink variant="text" label={t('common.callClinic')} className="font-semibold" />
      <Link
        to={lang === 'en' ? '/patient-guide' : `/${lang}/patient-guide`}
        className="inline-flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-forest"
      >
        {t('common.readPatientGuide')}
        <span aria-hidden="true" className="directional-icon">
          →
        </span>
      </Link>
    </div>
  );
}
