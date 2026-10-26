import { CtaFinal } from '../components/CtaFinal';
import { Differentials } from '../components/Differentials';
import { FAQ } from '../components/FAQ';
import { Gallery } from '../components/Gallery';
import { Hero } from '../components/Hero';
import { Location } from '../components/Location';
import { PartTag } from '../components/PartTag';
import { Reviews } from '../components/Reviews';
import { ServiceTable } from '../components/ServiceTable';
import { SplitShieldSteps } from '../components/SplitShieldSteps';
import { SymptomPicker } from '../components/SymptomPicker';
import { TrustBar } from '../components/TrustBar';

/** Ritmo: D P D P D P P D P P D D (hero, ficha, sintomas, serviços, como, peça, avaliações, diferenciais, FAQ, local, CTA). */
export function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <SymptomPicker />
      <ServiceTable />
      <SplitShieldSteps />
      <PartTag />
      <Reviews />
      <Differentials />
      <Gallery />
      <FAQ />
      <Location />
      <CtaFinal />
    </>
  );
}
