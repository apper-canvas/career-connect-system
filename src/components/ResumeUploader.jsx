import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { getIcon } from '../utils/iconUtils';

const ResumeUploader = ({ onFileSelected, isParsingResume }) => {
  const [fileError, setFileError] = useState(null);
  const FileIcon = getIcon('FileText');
  const UploadIcon = getIcon('Upload');
  const AlertIcon = getIcon('AlertCircle');
  
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    // Reset error
    setFileError(null);
    
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const { code, message } = rejectedFiles[0].errors[0];
      if (code === 'file-too-large') {
        setFileError('File is too large. Maximum size is 5MB.');
      } else if (code === 'file-invalid-type') {
        setFileError('Invalid file type. Please upload a PDF or DOCX file.');
      } else {
        setFileError(message);
      }
      return;
    }
    
    // Handle accepted files
    if (acceptedFiles.length > 0) {
      onFileSelected(acceptedFiles[0]);
    }
  }, [onFileSelected]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false
  });
  
  return (
    <div className="mt-4">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-primary bg-primary/5 dark:border-primary-light dark:bg-primary-dark/10' 
            : 'border-surface-300 dark:border-surface-600 hover:border-primary dark:hover:border-primary-light'
          }
          ${isParsingResume ? 'opacity-50 pointer-events-none' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center">
          {isParsingResume ? (
            <>
              <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p className="text-lg font-medium">Parsing your resume...</p>
              <p className="text-surface-500 dark:text-surface-400 mt-1">Please wait while we extract your information.</p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                {isDragActive ? (
                  <UploadIcon className="h-8 w-8 text-primary" />
                ) : (
                  <FileIcon className="h-8 w-8 text-primary" />
                )}
              </div>
              <p className="text-lg font-medium">{isDragActive ? 'Drop your resume here' : 'Drag & drop your resume'}</p>
              <p className="text-surface-500 dark:text-surface-400 mt-1">or click to browse (PDF or DOCX, max 5MB)</p>
            </>
          )}
        </div>
      </div>
      
      {fileError && (
        <div className="mt-2 text-red-500 flex items-center">
          <AlertIcon className="h-4 w-4 mr-1" />
          <span>{fileError}</span>
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;