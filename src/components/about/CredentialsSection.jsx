import { useTranslation } from 'react-i18next';
import { BadgeCheck, FileText } from 'lucide-react';
import { qualifications } from '../../data/qualifications.js';

export default function CredentialsSection() {
  const { t } = useTranslation();

  return (
    <section className="section-pad border-y border-line bg-paper">
      <div className="container-editorial">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">{t('about.credentials.eyebrow')}</p>
            <h2 className="display-lg mt-5">{t('about.credentials.heading')}</h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              {t('about.credentials.intro')}
            </p>
            <div className="mt-7 flex items-start gap-3 border-s-2 border-gold bg-stone/40 px-4 py-3">
              <FileText className="mt-0.5 h-4 w-4 flex-none text-gold" aria-hidden="true" />
              <p className="text-xs leading-relaxed text-muted">{t('about.credentials.note')}</p>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <ul className="border-t border-line">
              {qualifications.map((credential, index) => {
                const verified = credential.id === 'fcps';
                return (
                  <li
                    key={credential.id}
                    className="grid grid-cols-[2rem_1fr] items-center gap-4 border-b border-line py-5 sm:grid-cols-[2.5rem_1fr_auto] sm:gap-6"
                  >
                    <span className="number-ltr text-[0.62rem] font-semibold text-gold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      dir="ltr"
                      className="font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight text-forest"
                    >
                      {credential.label}
                    </span>
                    <span
                      className={`col-start-2 inline-flex w-fit items-center gap-1.5 border px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.08em] sm:col-start-3 rtl:tracking-normal rtl:text-[0.66rem] ${
                        verified
                          ? 'border-teal/25 bg-mint text-teal'
                          : 'border-forest/12 bg-ivory text-muted'
                      }`}
                    >
                      {verified ? (
                        <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : null}
                      {verified
                        ? t('about.credentials.verifiedLabel')
                        : t('about.credentials.suppliedLabel')}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
