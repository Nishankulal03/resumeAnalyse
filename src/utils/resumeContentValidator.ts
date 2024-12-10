// Keywords and patterns that typically appear in resumes
const RESUME_PATTERNS = {
  sections: /\b(education|experience|skills|work|employment|qualification|objective|summary|projects)\b/i,
  contact: /\b(email|phone|address|linkedin)\b/i,
  dates: /\b(20\d{2}|19\d{2})\b/,
  education: /\b(university|college|bachelor|master|degree|diploma|certification)\b/i,
  experience: /\b(work|job|position|role|responsibility|achievement|project)\b/i
};

export interface ContentValidationResult {
  isValid: boolean;
  confidence: number;
  missingElements: string[];
}

export function validateResumeContent(text: string): ContentValidationResult {
  const missingElements: string[] = [];
  let confidence = 0;

  // Check for presence of key resume sections
  if (RESUME_PATTERNS.sections.test(text)) {
    confidence += 30;
  } else {
    missingElements.push('standard resume sections (e.g., education, experience, skills)');
  }

  // Check for contact information
  if (RESUME_PATTERNS.contact.test(text)) {
    confidence += 20;
  } else {
    missingElements.push('contact information');
  }

  // Check for dates (usually present in resumes)
  if (RESUME_PATTERNS.dates.test(text)) {
    confidence += 15;
  } else {
    missingElements.push('dates');
  }

  // Check for education details
  if (RESUME_PATTERNS.education.test(text)) {
    confidence += 20;
  } else {
    missingElements.push('education details');
  }

  // Check for work experience details
  if (RESUME_PATTERNS.experience.test(text)) {
    confidence += 15;
  } else {
    missingElements.push('work experience details');
  }

  return {
    isValid: confidence >= 60, // Require at least 60% confidence
    confidence,
    missingElements
  };
}