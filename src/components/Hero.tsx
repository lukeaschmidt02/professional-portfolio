import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, FileText } from 'lucide-react';
import { GlassCard } from './GlassCard';
import profilePic from '../assets/Professional_picture.png';

export const Hero = () => {
    return (
        <section className="h-screen flex flex-col justify-center items-center relative">
            <div className="flex flex-col md:flex-row items-center gap-8 z-10 max-w-6xl mx-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl flex-shrink-0"
                >
                    <img src={profilePic} alt="Luke Schmidt" className="w-full h-full object-cover" />
                </motion.div>

                <GlassCard className="text-center p-8 md:p-12 flex-1">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4"
                    >
                        Luke Schmidt
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-accent font-light tracking-wide"
                    >
                        Software Engineer
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mt-6 text-gray-200 max-w-lg mx-auto"
                    >
                        Building enterprise AI agents, scalable web platforms, and immersive interactive experiences.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex justify-center gap-6 mt-8"
                    >
                        <motion.a
                            href="https://www.linkedin.com/in/lukeschmidt02/"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -5 }}
                            className="p-3 bg-white/10 rounded-full hover:bg-white/20 hover:text-[#0077b5] transition-colors border border-white/5"
                            title="LinkedIn"
                        >
                            <Linkedin size={24} />
                        </motion.a>
                        <motion.a
                            href="https://github.com/lukeaschmidt02"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -5 }}
                            className="p-3 bg-white/10 rounded-full hover:bg-white/20 hover:text-white transition-colors border border-white/5"
                            title="GitHub"
                        >
                            <Github size={24} />
                        </motion.a>
                        <motion.a
                            href="https://fuchsia-giuditta-7.tiiny.site/"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -5 }}
                            className="p-3 bg-white/10 rounded-full hover:bg-white/20 hover:text-red-400 transition-colors border border-white/5"
                            title="Resume"
                        >
                            <FileText size={24} />
                        </motion.a>
                    </motion.div>
                </GlassCard>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
            >
                <ArrowDown className="text-white w-8 h-8 opacity-70" />
            </motion.div>
        </section>
    );
};
