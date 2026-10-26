import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { StickyActionBar } from './components/StickyActionBar';
import { useTracking } from './hooks/useTracking';
import { ui } from './content/site';
import { resolveRoute } from './lib/route';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { PoliticaDePrivacidade } from './pages/PoliticaDePrivacidade';

export function App({ path }: { path: string }) {
  useTracking();
  const route = resolveRoute(path);
  return (
    <>
      <a className="skip" href="#conteudo">{ui.skip}</a>
      <Header home={route === 'home'} />
      <main id="conteudo" tabIndex={-1}>
        {route === 'home' && <Home />}
        {route === 'privacy' && <PoliticaDePrivacidade />}
        {route === 'notfound' && <NotFound />}
      </main>
      <Footer />
      <StickyActionBar />
    </>
  );
}
