export function validateFile(file: File): void {
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = {
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
  };

  if (!file) {
    throw new Error('Please select a resume file to upload');
  }

  if (!file.type) {
    throw new Error('Unable to determine file type. Please ensure you are uploading a valid resume file (PDF, DOC, DOCX)');
  }

  const fileExtension = file.name.toLowerCase().split('.').pop();
  const isValidExtension = Object.values(ALLOWED_TYPES).flat().includes(`.${fileExtension}`);
  const isValidMimeType = Object.keys(ALLOWED_TYPES).includes(file.type);

  if (!isValidExtension || !isValidMimeType) {
    throw new Error('Invalid file type. Please upload your resume in PDF, DOC, or DOCX format');
  }

  if (file.size === 0) {
    throw new Error('The selected resume file appears to be empty');
  }

  if (file.size > MAX_FILE_SIZE) {
    const sizeMB = Math.round(file.size / (1024 * 1024));
    throw new Error(`Resume file size (${sizeMB}MB) exceeds the 10MB limit. Please upload a smaller file`);
  }

  // Check if filename contains "resume" or "cv"
  const isResumeFilename = /resume|cv/i.test(file.name);
  if (!isResumeFilename) {
    throw new Error('Please ensure your file is a resume or CV. The filename should include "resume" or "cv"');
  }
}