import { CanvasContainer } from './components/CanvasContainer';
import { Hero } from './components/Hero';
import { Section } from './components/Section';
import { ProjectCard } from './components/ProjectCard';
import { projects } from './data/projects';

function App() {
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <main className="relative w-full min-h-screen text-white overflow-x-hidden">
      <CanvasContainer />

      <div className="relative z-10">
        <Hero />

        <Section id="featured" className="bg-gradient-to-b from-transparent to-black/20">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </Section>

        <Section id="projects">
          <h2 className="text-4xl font-bold mb-12 text-center">More Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} {...project} color="bg-gray-900/50" />
            ))}
          </div>
        </Section>

        <footer className="py-10 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Luke Schmidt. Built with React, Three.js & Tailwind.</p>
        </footer>
      </div>
    </main>
  );
}

export default App;
