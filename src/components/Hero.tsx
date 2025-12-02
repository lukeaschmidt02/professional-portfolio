import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
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
                        Building immersive web experiences and scalable backend systems.
                    </motion.p>
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
