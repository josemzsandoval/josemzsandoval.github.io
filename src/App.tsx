import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Nav } from './components/Nav';
import { profile } from './data/profile';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <footer>
        <div className="container">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span className="mono">Built with React · MapLibre GL · GitHub Pages</span>
        </div>
      </footer>
    </>
  );
}
