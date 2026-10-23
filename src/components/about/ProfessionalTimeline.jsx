import { useTranslation } from 'react-i18next';
import { BadgeCheck, FileText } from 'lucide-react';
import { recordNotes } from '../../data/qualifications.js';

export default function ProfessionalTimeline() {
  const { t } = useTranslation();

  return (
    <section className="section-pad border-y border-line bg-stone/35">
      <div className="container-editorial">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">{t('about.record.eyebrow')}</p>
            <h2 className="display-lg mt-5">{t('about.record.heading')}</h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              {t('about.record.intro')}
            </p>
            <div className="mt-7 flex items-start gap-3 border-t border-forest/15 pt-4">
              <FileText className="mt-0.5 h-4 w-4 flex-none text-gold" aria-hidden="true" />
              <p className="text-xs leading-relaxed text-muted/75">{t('about.record.note')}</p>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="border border-forest/15 bg-paper">
              <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
                <p className="font-display text-lg text-forest">{t('about.intro.breadcrumb')}</p>
                <span className="number-ltr text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-muted/55">
                  RECORD / 2026
                </span>
              </div>
              <dl>
                {recordNotes.map((item) => (
                  <div
                    key={item.id}
                    className="grid gap-2 border-b border-line px-5 py-4 last:border-b-0 sm:grid-cols-[0.8fr_1.6fr_auto] sm:items-center sm:gap-4 sm:px-6"
                  >
                    <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-muted/60 rtl:tracking-normal rtl:text-[0.7rem]">
                      {t(item.labelKey)}
                    </dt>
                    <dd className="text-sm leading-snug text-forest">{t(item.valueKey)}</dd>
                    <dd>
                      <span
                        className={`inline-flex items-center gap-1 border px-2 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.07em] rtl:tracking-normal rtl:text-[0.63rem] ${
                          item.status === 'verified'
                            ? 'border-teal/25 bg-mint text-teal'
                            : 'border-forest/12 bg-ivory text-muted'
                        }`}
                      >
                        {item.status === 'verified' ? (
                          <BadgeCheck className="h-3 w-3" aria-hidden="true" />
                        ) : null}
                        {item.status === 'verified'
                          ? t('common.verified')
                          : t('common.supplied')}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="mt-4 text-[0.68rem] leading-relaxed text-muted/60">
              {t('home.journey.timelineNote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
