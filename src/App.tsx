import { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { ScoreCard } from './components/ScoreCard';
import { SkillsAnalysis } from './components/SkillsAnalysis';
import { Suggestions } from './components/Suggestions';
import { CareerMatches } from './components/CareerMatches';
import { CourseRecommendations } from './components/CourseRecommendations';
import { ContentWarning } from './components/ContentWarning';
import { Header } from './components/layout/Header';
import { Container } from './components/layout/Container';
import type { ResumeAnalysis } from './types';
import { analyzeResume } from './utils/resumeAnalyzer';
import { validateResumeContent } from './utils/resumeValidator';

function App() {
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contentWarning, setContentWarning] = useState<{
    file: File;
    missingElements: string[];
  } | null>(null);

  const processFile = async (file: File) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);
    
    try {
      const text = await file.text();
      const validation = validateResumeContent(text);

      if (!validation.isResume) {
        setContentWarning({
          file,
          missingElements: validation.missingElements
        });
        setLoading(false);
        return;
      }

      const result = await analyzeResume(file);
      setAnalysis(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Error analyzing resume:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleContinueAnyway = async () => {
    if (contentWarning) {
      const { file } = contentWarning;
      setContentWarning(null);
      setLoading(true);
      try {
        const result = await analyzeResume(file);
        setAnalysis(result);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(errorMessage);
        console.error('Error analyzing resume:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancelWarning = () => {
    setContentWarning(null);
    setAnalysis(null);
  };

  return (
    <Container>
      <Header />
      
      <div className="space-y-8">
        <FileUpload onFileUpload={processFile} />
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-xl shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {loading && (
          <div className="text-center py-12">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full border-t-2 border-b-2 border-purple-500 animate-spin" style={{ animationDirection: 'reverse' }}></div>
              </div>
            </div>
            <p className="mt-4 text-lg text-gray-600">Analyzing your resume...</p>
          </div>
        )}

        {contentWarning && (
          <ContentWarning
            missingElements={contentWarning.missingElements}
            onContinue={handleContinueAnyway}
            onCancel={handleCancelWarning}
          />
        )}
        
        {analysis && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-lg backdrop-blur-sm">
              <p className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                Experience Level: {analysis.experienceLevel}
              </p>
              <p className="text-gray-600">
                Total Years of Experience: {analysis.totalYearsOfExperience} years
              </p>
            </div>
            <ScoreCard score={analysis.score} />
            <CareerMatches matches={analysis.careerMatches} />
            <SkillsAnalysis skills={analysis.skillMatches} />
            <Suggestions suggestions={analysis.suggestions} />
            <CourseRecommendations courses={analysis.recommendedCourses} />
          </div>
        )}
      </div>
    </Container>
  );
}

export default App;