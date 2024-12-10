// Keywords and patterns that indicate a file is likely a resume
const RESUME_INDICATORS = {
  sections: [
    'experience',
    'education',
    'skills',
    'work history',
    'employment',
    'qualifications',
    'professional summary',
    'objective'
  ],
  contact: [
    'email',
    'phone',
    'address',
    'linkedin'
  ],
  education: [
    'university',
    'college',
    'bachelor',
    'master',
    'degree',
    'diploma',
    'certification',
    'gpa'
  ],
  professional: [
    'work experience',
    'professional experience',
    'employment history',
    'career highlights',
    'achievements',
    'responsibilities'
  ]
};

export interface ValidationResult {
  isResume: boolean;
  confidence: number;
  missingElements: string[];
  details: {
    hasSections: boolean;
    hasContact: boolean;
    hasEducation: boolean;
    hasProfessional: boolean;
  };
}

export function validateResumeContent(text: string): ValidationResult {
  const normalizedText = text.toLowerCase();
  const missingElements: string[] = [];
  let confidence = 0;
  
  // Check for resume sections
  const hasSections = RESUME_INDICATORS.sections.some(section => 
    normalizedText.includes(section)
  );
  if (hasSections) {
    confidence += 30;
  } else {
    missingElements.push('standard resume sections (Experience, Education, Skills)');
  }

  // Check for contact information
  const hasContact = RESUME_INDICATORS.contact.some(item => 
    normalizedText.includes(item)
  );
  if (hasContact) {
    confidence += 25;
  } else {
    missingElements.push('contact information');
  }

  // Check for education details
  const hasEducation = RESUME_INDICATORS.education.some(item => 
    normalizedText.includes(item)
  );
  if (hasEducation) {
    confidence += 25;
  } else {
    missingElements.push('education details');
  }

  // Check for professional experience
  const hasProfessional = RESUME_INDICATORS.professional.some(item => 
    normalizedText.includes(item)
  );
  if (hasProfessional) {
    confidence += 20;
  } else {
    missingElements.push('professional experience details');
  }

  return {
    isResume: confidence >= 70, // Require at least 70% confidence
    confidence,
    missingElements,
    details: {
      hasSections,
      hasContact,
      hasEducation,
      hasProfessional
    }
  };
}