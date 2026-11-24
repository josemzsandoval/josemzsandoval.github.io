import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Reach } from './components/Reach';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Nav } from './components/Nav';
import { site, t } from './i18n';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">{t.ui.skipLink}</a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Reach />
        <Skills />
        <Education />
        <Contact />
      </main>
      <footer>
        <div className="container">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span className="mono">{t.ui.footer.builtWith}</span>
        </div>
      </footer>
    </>
  );
}
