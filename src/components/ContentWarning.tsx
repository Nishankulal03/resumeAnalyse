import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface ContentWarningProps {
  missingElements: string[];
  onContinue: () => void;
  onCancel: () => void;
}

export function ContentWarning({ missingElements, onContinue, onCancel }: ContentWarningProps) {
  return (
    <motion.div 
      className="fixed inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="absolute top-4 right-4">
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="bg-yellow-100 rounded-full p-2">
              <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              This might not be a resume
            </h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>The uploaded file is missing some typical resume elements:</p>
              <ul className="list-disc pl-5 space-y-1">
                {missingElements.map((element, index) => (
                  <li key={index} className="text-gray-600">{element}</li>
                ))}
              </ul>
              <p className="mt-2 font-medium">
                Are you sure this is a resume file?
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Upload different file
          </button>
          <button
            onClick={onContinue}
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
          >
            Continue anyway
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}