import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';
import LanguageLayout from './components/layout/LanguageLayout.jsx';
import Home from './pages/Home.jsx';

const About = lazy(() => import('./pages/About.jsx'));
const Expertise = lazy(() => import('./pages/Expertise.jsx'));
const PatientGuide = lazy(() => import('./pages/PatientGuide.jsx'));
const Research = lazy(() => import('./pages/Research.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Privacy = lazy(() => import('./pages/Privacy.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function PageFallback() {
  const { t } = useTranslation();
  return (
    <div className="container-editorial py-24" aria-busy="true" aria-live="polite">
      <span className="sr-only">{t('common.loading')}</span>
      <div className="h-3 w-24 animate-pulse bg-stone" aria-hidden="true" />
      <div className="mt-5 h-10 w-2/3 max-w-xl animate-pulse bg-stone/80" aria-hidden="true" />
      <div className="mt-3 h-4 w-1/2 max-w-md animate-pulse bg-stone/60" aria-hidden="true" />
    </div>
  );
}

function withFallback(page) {
  return <Suspense fallback={<PageFallback />}>{page}</Suspense>;
}

function localizedRoutes() {
  return (
    <>
      <Route index element={<Home />} />
      <Route path="about" element={withFallback(<About />)} />
      <Route path="expertise" element={withFallback(<Expertise />)} />
      <Route path="patient-guide" element={withFallback(<PatientGuide />)} />
      <Route path="research" element={withFallback(<Research />)} />
      <Route path="contact" element={withFallback(<Contact />)} />
      <Route path="privacy" element={withFallback(<Privacy />)} />
      <Route path="*" element={withFallback(<NotFound />)} />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<LanguageLayout lang="en" />}>{localizedRoutes()}</Route>
      <Route path="/fa" element={<LanguageLayout lang="fa" />}>
        {localizedRoutes()}
      </Route>
      <Route path="/ps" element={<LanguageLayout lang="ps" />}>
        {localizedRoutes()}
      </Route>
    </Routes>
  );
}
