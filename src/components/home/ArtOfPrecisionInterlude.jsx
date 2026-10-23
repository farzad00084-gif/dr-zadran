import { useTranslation } from 'react-i18next';
import { PrecisionArcs } from '../art/AnatomyArt.jsx';
import EditorialPhoto from '../common/EditorialPhoto.jsx';
import { editorialImages } from '../../data/editorialImages.js';

export default function ArtOfPrecisionInterlude() {
  const { t } = useTranslation();
  const points = t('home.interlude.points', { returnObjects: true });

  return (
    <section className="relative overflow-hidden bg-forest text-paper">
      <PrecisionArcs
        className="pointer-events-none absolute -end-40 -top-44 w-[38rem] text-sage/[0.08]"
      />
      <div className="container-editorial relative py-16 md:py-24 lg:py-28">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-paper/20 pt-5">
          <p className="eyebrow !text-sage">{t('home.interlude.eyebrow')}</p>
          <span className="number-ltr text-[0.62rem] font-semibold tracking-[0.16em] text-sage/45">
            {t('home.interlude.index')}
          </span>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <h2 className="font-display text-[clamp(3.8rem,9.4vw,8rem)] leading-[0.9] tracking-[-0.035em] text-paper">
              <span className="block">{t('home.interlude.line1')}</span>
              <span className="block italic text-sage">{t('home.interlude.line2')}</span>
            </h2>
            <p className="mt-7 max-w-xl text-[clamp(1.1rem,2vw,1.4rem)] font-medium leading-relaxed text-sage/85">
              {t('home.interlude.line3')}
            </p>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-sage/60">
              {t('home.interlude.body')}
            </p>
          </div>

          <div className="flex flex-col justify-between border-t border-paper/15 pt-7 lg:col-span-4 lg:border-s lg:border-t-0 lg:ps-8 lg:pt-0">
            <EditorialPhoto
              image={editorialImages.instrumentStudy}
              aspect="aspect-[4/5]"
              sizes="(min-width: 1024px) 280px, 75vw"
              tone="dark"
              frameClassName="!border-paper/20"
              className="w-full max-w-[280px]"
            />
            <ol className="mt-8 space-y-0 border-t border-paper/15 lg:mt-0">
              {Array.isArray(points) &&
                points.map((point, index) => (
                  <li
                    key={point}
                    className="flex items-baseline gap-4 border-b border-paper/15 py-4 text-sm text-sage/85"
                  >
                    <span className="number-ltr text-[0.62rem] font-semibold text-gold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
            </ol>
            <p className="mt-6 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-sage/40 rtl:tracking-normal rtl:text-[0.7rem]">
              {t('home.interlude.caption')}
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden border-t border-paper/15 py-4" aria-hidden="true">
        <div className="flex w-max items-center gap-8 whitespace-nowrap text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-sage/35">
          {Array.from({ length: 2 }).map((_, group) => (
            <div key={group} className="flex items-center gap-8">
              {['Precision', 'Judgement', 'Care', 'Clarity', 'Kabul'].map((word) => (
                <span key={word} className="flex items-center gap-8">
                  {word}
                  <span className="text-gold/50">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
