import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ScoreRingProps {
  value: number;
  label: string;
  delay: number;
  color?: {
    from: string;
    to: string;
  };
}

export function ScoreRing({ 
  value, 
  label, 
  delay,
  color = { from: '#2563eb', to: '#9333ea' }
}: ScoreRingProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  const gradientId = `scoreGradient-${label.toLowerCase().replace(/\s+/g, '-')}`;

  const variants = {
    hidden: { strokeDashoffset: circumference },
    visible: { 
      strokeDashoffset,
      transition: { duration: 1.5, delay, ease: "easeOut" }
    }
  };

  return (
    <div ref={ref} className="relative w-32 h-32 group">
      <div className="absolute inset-0 bg-gradient-radial from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-gray-200"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          stroke={`url(#${gradientId})`}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          variants={variants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="drop-shadow-lg"
        />
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color.from} />
            <stop offset="100%" stopColor={color.to} />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <motion.span 
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r"
          style={{ backgroundImage: `linear-gradient(to right, ${color.from}, ${color.to})` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.5 }}
        >
          {value}%
        </motion.span>
        <motion.span 
          className="text-sm text-gray-500 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.7 }}
        >
          {label}
        </motion.span>
      </div>
    </div>
  );
}