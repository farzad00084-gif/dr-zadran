import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import EditorialPhoto from '../common/EditorialPhoto.jsx';
import { expertiseImages } from '../../data/clientImages.js';
import useLanguage from '../../hooks/useLanguage.js';

export default function ExpertiseArea({ area, index }) {
  const { t } = useTranslation();
  const { path } = useLanguage();
  const scope = t(area.scopeKey, { returnObjects: true });
  const isEmergency = area.id === 'neurotrauma';
  const image = expertiseImages[index % expertiseImages.length];

  return (
    <article
      id={area.id}
      className="scroll-mt-28 border-t border-line py-12 md:py-16"
      aria-labelledby={`${area.id}-heading`}
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
          <EditorialPhoto
            image={image}
            aspect="aspect-[4/3]"
            sizes="(min-width:1024px) 340px, 70vw"
            notClinic
          />
          <div className="mt-3 flex items-center justify-between gap-4 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted/55 rtl:tracking-normal rtl:text-[0.7rem]">
            <span className="number-ltr">{area.index} / 05</span>
            <span>{t('expertise.intro.indexLabel')}</span>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="eyebrow">
            {t('expertise.intro.breadcrumb')} · {area.index}
          </p>
          <h2 id={`${area.id}-heading`} className="display-md mt-4">
            {t(area.titleKey)}
          </h2>
          <p className="mt-4 font-display text-xl leading-snug text-teal">
            {t(area.summaryKey)}
          </p>
          <p className="prose-editorial mt-5 max-w-2xl">{t(area.bodyKey)}</p>

          <div className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-12">
            <div className="sm:col-span-7">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted/60 rtl:tracking-normal rtl:text-[0.7rem]">
                {t('expertise.areas.brain.fieldLabel')}
              </p>
              <ul className="mt-3">
                {Array.isArray(scope) &&
                  scope.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 border-b border-line py-2.5 text-sm leading-relaxed text-ink/85"
                    >
                      <span className="text-gold" aria-hidden="true">
                        +
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="sm:col-span-5 sm:border-s sm:border-line sm:ps-6">
              <Link to={path(area.href)} className="link-editorial">
                <span>{t(area.linkKey)}</span>
                <span aria-hidden="true" className="directional-icon">
                  →
                </span>
              </Link>
              {isEmergency ? (
                <p className="mt-4 text-xs leading-relaxed text-emergency">
                  {t('home.guide.emergency')}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
