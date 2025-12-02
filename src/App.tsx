import { CanvasContainer } from './components/CanvasContainer';
import { Hero } from './components/Hero';
import { Section } from './components/Section';
import { ProjectCard } from './components/ProjectCard';
import { GlassCard } from './components/GlassCard';
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
          <GlassCard className="mb-12 inline-block px-8 py-4">
            <h2 className="text-4xl font-bold text-center">Featured Work</h2>
          </GlassCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </Section>

        <Section id="projects">
          <GlassCard className="mb-12 inline-block px-8 py-4">
            <h2 className="text-4xl font-bold text-center">More Projects</h2>
          </GlassCard>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} {...project} color="bg-gray-900/50" />
            ))}
          </div>
        </Section>

        <footer className="py-10 text-center text-gray-500 text-sm">
          <GlassCard className="inline-block px-6 py-3">
            <p>© {new Date().getFullYear()} Luke Schmidt. Built with React, Three.js & Tailwind.</p>
          </GlassCard>
        </footer>
      </div>
    </main>
  );
}

export default App;
