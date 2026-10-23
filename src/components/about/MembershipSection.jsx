import { useTranslation } from 'react-i18next';
import { BadgeCheck, Clock3, ShieldCheck } from 'lucide-react';

export default function MembershipSection() {
  const { t } = useTranslation();

  return (
    <section className="section-pad">
      <div className="container-editorial">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">{t('about.memberships.eyebrow')}</p>
            <h2 className="display-lg mt-5">{t('about.memberships.heading')}</h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
              {t('about.memberships.body')}
            </p>
          </div>

          <div className="space-y-4 lg:col-span-6 lg:col-start-7">
            <article className="border border-teal/20 bg-mint p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-teal/15 pb-4">
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-teal/70 rtl:tracking-normal rtl:text-[0.7rem]">
                  {t('about.memberships.fellowshipLabel')}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-teal rtl:tracking-normal rtl:text-[0.68rem]">
                  <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                  {t('about.memberships.verifiedLabel')}
                </span>
              </div>
              <h3 className="mt-5 font-display text-[clamp(1.5rem,2.6vw,2.2rem)] leading-tight text-forest">
                {t('about.memberships.fellowshipName')}
              </h3>
              <p className="number-ltr mt-2 text-sm font-semibold text-teal" dir="ltr">
                {t('about.memberships.fellowshipDetail')}
              </p>
              <p className="mt-4 text-xs leading-relaxed text-muted">
                {t('about.memberships.fellowshipNote')}
              </p>
            </article>

            <article className="border border-line bg-paper p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 flex-none items-center justify-center border border-forest/15 text-muted">
                  <Clock3 className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-xl leading-tight text-forest">
                    {t('about.memberships.pendingTitle')}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {t('about.memberships.pendingBody')}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-muted/70 rtl:tracking-normal rtl:text-[0.68rem]">
                    <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    {t('about.memberships.reviewLabel')}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
