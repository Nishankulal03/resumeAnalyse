import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { DocumentIcon, XCircleIcon, ExclamationTriangleIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { validateFile } from '../utils/fileValidator';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const [isDragReject, setIsDragReject] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    
    if (acceptedFiles.length > 0) {
      try {
        const file = acceptedFiles[0];
        validateFile(file);
        onFileUpload(file);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while processing the file');
      }
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    onDragEnter: () => setIsDragReject(false),
    onDragLeave: () => setIsDragReject(false),
    onDropRejected: () => setIsDragReject(true)
  });

  return (
    <div className="space-y-4">
      <motion.div
        {...getRootProps()}
        className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all ${
          isDragActive && !isDragReject
            ? 'bg-blue-50 border-blue-500'
            : isDragReject
            ? 'bg-red-50 border-red-500'
            : 'bg-white hover:bg-blue-50'
        }`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input {...getInputProps()} />
        <div className="relative p-8">
          <div className="absolute inset-0 bg-gradient-radial from-blue-50 to-transparent opacity-50" />
          <div className="relative space-y-4">
            {isDragReject ? (
              <div className="text-center">
                <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-red-400 animate-bounce" />
                <p className="text-red-500 font-medium">This file type is not supported</p>
              </div>
            ) : (
              <>
                <div className="flex justify-center">
                  {isDragActive ? (
                    <ArrowUpTrayIcon className="h-16 w-16 text-blue-500 animate-bounce" />
                  ) : (
                    <DocumentIcon className="h-16 w-16 text-blue-500" />
                  )}
                </div>
                <div className="text-center space-y-2">
                  <p className="text-xl font-medium text-gray-700">
                    {isDragActive ? "Drop your resume here..." : "Drop your resume or click to browse"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Supported formats: PDF, DOC, DOCX (max 10MB)
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {error && (
        <motion.div 
          className="bg-red-50 border-l-4 border-red-400 p-4 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start">
            <XCircleIcon className="h-5 w-5 text-red-400 mt-0.5" />
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}