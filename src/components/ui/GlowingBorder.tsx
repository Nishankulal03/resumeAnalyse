import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlowingBorderProps {
  children: ReactNode;
  className?: string;
}

export function GlowingBorder({ children, className = '' }: GlowingBorderProps) {
  return (
    <motion.div 
      className={`relative group ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
      <div className="relative bg-white rounded-2xl">
        {children}
      </div>
    </motion.div>
  );
}