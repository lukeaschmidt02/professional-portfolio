import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export const Hero = () => {
    return (
        <section className="h-screen flex flex-col justify-center items-center relative">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="text-center z-10 bg-black/30 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl max-w-4xl mx-4"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4"
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
                    className="mt-6 text-gray-400 max-w-lg mx-auto"
                >
                    Building immersive web experiences and scalable backend systems.
                </motion.p>
            </motion.div>

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
