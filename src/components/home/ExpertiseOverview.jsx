import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Brain, Activity, Bone, Microscope, ScanLine } from 'lucide-react';
import { expertiseAreas, homeExpertise } from '../../data/expertise.js';
import useLanguage from '../../hooks/useLanguage.js';
import SectionHeading from '../common/SectionHeading.jsx';
import Reveal from '../common/Reveal.jsx';
import { Artwork } from '../art/AnatomyArt.jsx';

const icons = {
  brain: Brain,
  activity: Activity,
  spine: Bone,
  microscope: Microscope,
  scan: ScanLine,
};

export default function ExpertiseOverview() {
  const { t } = useTranslation();
  const { path } = useLanguage();
  const areas = homeExpertise
    .map((id) => expertiseAreas.find((area) => area.id === id))
    .filter(Boolean);

  return (
    <section className="section-pad border-b border-line bg-paper">
      <div className="container-editorial">
        <Reveal>
          <SectionHeading
            eyebrow={t('home.expertise.eyebrow')}
            title={t('home.expertise.heading')}
            intro={t('home.expertise.intro')}
            link={
              <Link to={path('/expertise')} className="link-editorial">
                <span>{t('home.expertise.link')}</span>
                <ArrowUpRight className="directional-icon h-4 w-4" aria-hidden="true" />
              </Link>
            }
          />
        </Reveal>

        <div className="mt-12 border-t border-line">
          {areas.map((area, index) => {
            const Icon = icons[area.icon] ?? Brain;
            return (
              <Reveal key={area.id} delay={index * 40}>
                <Link
                  to={path('/expertise')}
                  className="index-row group grid grid-cols-[2.25rem_1fr_auto] items-center gap-x-4 gap-y-3 border-b border-line py-6 md:grid-cols-12 md:gap-5 md:px-3 md:py-7"
                >
                  <span className="number-ltr self-start pt-1 text-[0.66rem] font-semibold tracking-[0.12em] text-gold md:col-span-1 md:self-center md:pt-0">
                    {area.index}
                  </span>
                  <div className="md:col-span-4">
                    <span className="mb-2 flex h-8 w-8 items-center justify-center border border-forest/15 text-teal transition-colors group-hover:border-forest/40">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-[1.55rem] leading-tight text-forest md:text-[1.8rem]">
                      {t(area.titleKey)}
                    </h3>
                  </div>
                  <p className="col-span-2 text-sm leading-relaxed text-muted md:col-span-5 md:col-start-6">
                    {t(area.summaryKey)}
                  </p>
                  <div className="col-start-2 flex items-center gap-4 md:col-span-2 md:col-start-11 md:justify-end">
                    <Artwork
                      name={area.art}
                      className="hidden h-12 w-12 text-forest/25 transition-colors group-hover:text-teal/60 sm:block"
                    />
                    <span className="flex h-10 w-10 items-center justify-center border border-forest/15 text-forest transition-all group-hover:border-forest group-hover:bg-forest group-hover:text-paper">
                      <ArrowUpRight
                        className="directional-icon h-4 w-4"
                        aria-hidden="true"
                      />
                      <span className="sr-only">{t('common.learnMore')}</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-5 max-w-3xl text-xs leading-relaxed text-muted/70">
          {t('home.expertise.footnote')}
        </p>
      </div>
    </section>
  );
}
