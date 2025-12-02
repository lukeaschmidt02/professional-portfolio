import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
    title: string;
    description: string;
    techStack: string[];
    imageUrl?: string;
    demoUrl?: string;
    repoUrl?: string;
    color?: string;
}

export const ProjectCard = ({ title, description, techStack, imageUrl, demoUrl, repoUrl, color = "bg-secondary" }: ProjectCardProps) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className={`rounded-xl overflow-hidden ${color} shadow-lg border border-gray-700/50 flex flex-col h-full`}
        >
            {imageUrl ? (
                <div className="h-48 overflow-hidden">
                    <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                </div>
            ) : (
                <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <span className="text-gray-600 text-4xl font-bold opacity-20">{title[0]}</span>
                </div>
            )}

            <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
                <p className="text-gray-400 mb-4 flex-1">{description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {techStack.map((tech) => (
                        <span key={tech} className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-accent border border-white/5">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex gap-4 mt-auto">
                    {demoUrl && (
                        <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-white hover:text-accent transition-colors">
                            <ExternalLink size={16} /> Live Demo
                        </a>
                    )}
                    {repoUrl && (
                        <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-white hover:text-accent transition-colors">
                            <Github size={16} /> Code
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
