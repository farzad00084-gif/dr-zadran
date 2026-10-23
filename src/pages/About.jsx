import { useTranslation } from 'react-i18next';
import { Artwork } from '../components/art/AnatomyArt.jsx';
import Seo from '../components/common/Seo.jsx';
import PageIntro from '../components/common/PageIntro.jsx';
import BiographySection from '../components/about/BiographySection.jsx';
import CredentialsSection from '../components/about/CredentialsSection.jsx';
import MembershipSection from '../components/about/MembershipSection.jsx';
import ProfessionalTimeline from '../components/about/ProfessionalTimeline.jsx';
import ContactBand from '../components/common/ContactBand.jsx';
import Reveal from '../components/common/Reveal.jsx';
import useLanguage from '../hooks/useLanguage.js';
import { buildPhysicianSchema } from '../utils/seo.js';

export default function About() {
  const { t } = useTranslation();
  const { path, lang } = useLanguage();

  return (
    <>
      <Seo
        page="about"
        jsonLd={buildPhysicianSchema({
          lang,
          roleFull: t('brand.roleFull'),
          affiliation: t('home.hero.affiliationValue'),
        })}
      />
      <PageIntro
        eyebrow={t('about.intro.eyebrow')}
        title={t('about.intro.title')}
        lead={t('about.intro.lead')}
        breadcrumb={[
          { label: t('nav.home'), to: path('/') },
          { label: t('about.intro.breadcrumb') },
        ]}
      />
      <BiographySection />
      <CredentialsSection />
      <MembershipSection />
      <ProfessionalTimeline />

      <section className="relative overflow-hidden border-t border-line bg-mint/60">
        <Artwork
          name="neuron"
          className="pointer-events-none absolute -bottom-16 -end-16 w-[28rem] text-teal/[0.07]"
        />
        <div className="container-editorial relative py-16 md:py-24">
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">{t('about.philosophy.eyebrow')}</p>
              <h2 className="display-lg mt-5">{t('about.philosophy.heading')}</h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-[clamp(1.05rem,2vw,1.3rem)] leading-relaxed text-ink/85">
                {t('about.philosophy.body')}
              </p>
              <p className="mt-6 border-t border-forest/15 pt-4 text-xs italic leading-relaxed text-muted">
                {t('about.philosophy.attribution')}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactBand
        eyebrow={t('contact.intro.eyebrow')}
        title={t('about.contact.heading')}
        body={t('about.contact.body')}
        primaryLabel={t('about.contact.cta')}
        secondary={{ label: t('nav.contact'), to: '/contact' }}
      />
    </>
  );
}
