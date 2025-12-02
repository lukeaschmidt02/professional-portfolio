import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionProps {
    children: ReactNode;
    id?: string;
    className?: string;
}

export const Section = ({ children, id, className = "" }: SectionProps) => {
    return (
        <section id={id} className={`min-h-screen flex flex-col justify-center items-center py-20 ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-full max-w-6xl px-4"
            >
                {children}
            </motion.div>
        </section>
    );
};
