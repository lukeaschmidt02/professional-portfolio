import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export const GlassCard = ({ children, className = "", delay = 0 }: GlassCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay }}
            viewport={{ once: true }}
            className={`bg-black/30 backdrop-blur-md border border-white/10 shadow-2xl rounded-3xl ${className}`}
        >
            {children}
        </motion.div>
    );
};
