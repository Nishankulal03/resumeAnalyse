import { motion } from 'framer-motion';
import { DocumentMagnifyingGlassIcon, SparklesIcon } from '@heroicons/react/24/outline';

export function Header() {
  return (
    <div className="text-center mb-16 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent opacity-40" />
      </div>
      
      <motion.div 
        className="flex items-center justify-center mb-8"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          <div className="relative flex space-x-4 bg-white rounded-full p-4 ring-1 ring-gray-900/5">
            <DocumentMagnifyingGlassIcon className="h-12 w-12 text-blue-600" />
            <SparklesIcon className="h-12 w-12 text-purple-600 animate-pulse" />
          </div>
        </div>
      </motion.div>

      <motion.h1 
        className="text-6xl font-extrabold mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Resume Analyzer
        </span>
      </motion.h1>

      <motion.p 
        className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Transform your career journey with AI-powered resume analysis. Get detailed insights about your skills, 
        perfect career matches, and personalized recommendations.
      </motion.p>
    </div>
  );
}