import { motion } from 'framer-motion';

interface ScoreInsightProps {
  score: number;
  label: string;
  description: string;
}

export function ScoreInsight({ score, label, description }: ScoreInsightProps) {
  const getScoreColor = (value: number) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 60) return 'text-blue-600';
    return 'text-amber-600';
  };

  const getScoreMessage = (value: number) => {
    if (value >= 80) return 'Excellent';
    if (value >= 60) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <motion.div 
      className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <span className={`text-sm font-semibold ${getScoreColor(score)}`}>
          {getScoreMessage(score)}
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full mb-2">
        <motion.div 
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  );
}