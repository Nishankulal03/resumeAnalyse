import { motion } from 'framer-motion';
import { ResumeScore } from '../types';
import { GlowingBorder } from './ui/GlowingBorder';
import { ScoreRing } from './score/ScoreRing';
import { ScoreInsight } from './score/ScoreInsight';

interface ScoreCardProps {
  score: ResumeScore;
}

const scoreDescriptions = {
  keywords: "Measures the presence and relevance of industry-specific keywords in your resume",
  formatting: "Evaluates the structure, layout, and organization of your resume content",
  atsCompatibility: "Indicates how well your resume will perform with Applicant Tracking Systems"
};

const scoreColors = {
  overall: { from: '#2563eb', to: '#9333ea' },
  keywords: { from: '#059669', to: '#10b981' },
  formatting: { from: '#6366f1', to: '#8b5cf6' },
  atsCompatibility: { from: '#ea580c', to: '#f97316' }
};

export function ScoreCard({ score }: ScoreCardProps) {
  return (
    <GlowingBorder>
      <div className="p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            Resume Score Analysis
          </h2>
          <p className="text-gray-600 mb-8">
            A comprehensive analysis of your resume's effectiveness across key metrics
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <ScoreRing 
            label="Overall" 
            value={score.overall} 
            delay={0}
            color={scoreColors.overall}
          />
          <ScoreRing 
            label="Keywords" 
            value={score.keywords} 
            delay={0.2}
            color={scoreColors.keywords}
          />
          <ScoreRing 
            label="Formatting" 
            value={score.formatting} 
            delay={0.4}
            color={scoreColors.formatting}
          />
          <ScoreRing 
            label="ATS" 
            value={score.atsCompatibility} 
            delay={0.6}
            color={scoreColors.atsCompatibility}
          />
        </div>

        <div className="space-y-4">
          <ScoreInsight
            label="Keyword Optimization"
            score={score.keywords}
            description={scoreDescriptions.keywords}
          />
          <ScoreInsight
            label="Resume Formatting"
            score={score.formatting}
            description={scoreDescriptions.formatting}
          />
          <ScoreInsight
            label="ATS Compatibility"
            score={score.atsCompatibility}
            description={scoreDescriptions.atsCompatibility}
          />
        </div>
      </div>
    </GlowingBorder>
  );
}