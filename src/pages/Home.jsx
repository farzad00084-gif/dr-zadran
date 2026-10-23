import { useTranslation } from 'react-i18next';
import HomeHero from '../components/home/HomeHero.jsx';
import IntroductionSection from '../components/home/IntroductionSection.jsx';
import ArtOfPrecisionInterlude from '../components/home/ArtOfPrecisionInterlude.jsx';
import ExpertiseOverview from '../components/home/ExpertiseOverview.jsx';
import ProfessionalJourney from '../components/home/ProfessionalJourney.jsx';
import ResearchPreview from '../components/home/ResearchPreview.jsx';
import ClinicIntroduction from '../components/home/ClinicIntroduction.jsx';
import PatientGuidePreview from '../components/home/PatientGuidePreview.jsx';
import HomeContactSection from '../components/home/HomeContactSection.jsx';
import Seo from '../components/common/Seo.jsx';
import useLanguage from '../hooks/useLanguage.js';
import { buildPhysicianSchema } from '../utils/seo.js';

export default function Home() {
  const { t } = useTranslation();
  const { lang } = useLanguage();

  return (
    <>
      <Seo
        page="home"
        jsonLd={buildPhysicianSchema({
          lang,
          roleFull: t('brand.roleFull'),
          affiliation: t('home.hero.affiliationValue'),
        })}
      />
      <HomeHero />
      <IntroductionSection />
      <ArtOfPrecisionInterlude />
      <ExpertiseOverview />
      <ProfessionalJourney />
      <ResearchPreview />
      <ClinicIntroduction />
      <PatientGuidePreview />
      <HomeContactSection />
    </>
  );
}
