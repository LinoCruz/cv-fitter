import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import * as pdfjsLib from 'pdfjs-dist/webpack';
import LoadingAnimation from './LoadingAnimation';
import EnhancementResults from './EnhancementResults';
import { enhanceCV } from '../../services/api';

// Set the worker source for pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const CVEnhancer = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [enhancementResult, setEnhancementResult] = useState(null);
  const [error, setError] = useState('');
  const [processingStatus, setProcessingStatus] = useState('');
  const fileInputRef = useRef(null);

  const extractTextFromPDF = async (pdfFile) => {
    setProcessingStatus(t('cvEnhancer.extractingText'));
    
    try {
      // Read the file as an ArrayBuffer
      const arrayBuffer = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(pdfFile);
      });
      
      // Load the PDF document
      const pdf = await pdfjsLib.getDocument({data: arrayBuffer}).promise;
      let fullText = '';
      
      // Loop through each page and extract text
      for (let i = 1; i <= pdf.numPages; i++) {
        setProcessingStatus(t('cvEnhancer.processingPage', {page: i, total: pdf.numPages}));
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + ' ';
      }
      
      setExtractedText(fullText.trim());
      setProcessingStatus('');
      return fullText.trim();
    } catch (err) {
      console.error('Error extracting text from PDF:', err);
      setError(t('cvEnhancer.errorExtractingText'));
      setProcessingStatus('');
      return '';
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
      await extractTextFromPDF(selectedFile);
    } else if (selectedFile) {
      setFile(null);
      setExtractedText('');
      setError(t('cvEnhancer.errorFileType'));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError(t('cvEnhancer.errorNoFile'));
      return;
    }
    
    if (!jobDescription.trim()) {
      setError(t('cvEnhancer.errorNoJobDescription'));
      return;
    }
    
    if (!extractedText) {
      setError(t('cvEnhancer.errorNoExtractedText'));
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Create FormData object to send to Python backend
      const formData = new FormData();
      formData.append('cv_file', file); // The backend will receive this as a file
      formData.append('cv_text', extractedText); // Send extracted text to avoid re-processing on backend
      formData.append('job_description', jobDescription);
      
      const result = await enhanceCV(formData);
      
      // Transform result to expected format if needed
      setEnhancementResult({
        // Convert base64 PDF data to binary if that's how your Python backend returns it
        enhancedCvPdf: result.enhanced_cv_pdf ? 
          Uint8Array.from(atob(result.enhanced_cv_pdf), c => c.charCodeAt(0)).buffer : 
          null,
        changes: result.changes || [],
        recommendations: result.recommendations || []
      });
    } catch (err) {
      console.error('Error enhancing CV:', err);
      setError(t('cvEnhancer.errorProcessing'));
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setExtractedText('');
    setJobDescription('');
    setEnhancementResult(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mx-auto max-w-4xl" id="cv-enhancer">
      {isLoading ? (
        <LoadingAnimation message={t('cvEnhancer.loading')} />
      ) : enhancementResult ? (
        <EnhancementResults 
          result={enhancementResult} 
          originalFile={file}
          onReset={resetForm}
        />
      ) : (
        <>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
            {t('cvEnhancer.title')}
          </h2>
          <div className="text-center mb-6 text-gray-600">
            {t('cvEnhancer.description')}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {t('cvEnhancer.uploadLabel')}
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center justify-center pt-7">
                    {processingStatus ? (
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-2"></div>
                        <p className="text-sm text-gray-600">{processingStatus}</p>
                      </div>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        <p className="pt-1 text-sm tracking-wider text-gray-600">
                          {file ? file.name : t('cvEnhancer.uploadPrompt')}
                        </p>
                      </>
                    )}
                  </div>
                  <input 
                    type="file" 
                    className="opacity-0" 
                    accept=".pdf" 
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    disabled={processingStatus !== ''}
                  />
                </label>
              </div>
              {extractedText && (
                <div className="mt-2 text-xs text-green-600">
                  {t('cvEnhancer.textExtracted')}
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="job-description" className="block text-gray-700 font-medium mb-2">
                {t('cvEnhancer.jobDescriptionLabel')}
              </label>
              <textarea
                id="job-description"
                rows="6"
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={t('cvEnhancer.jobDescriptionPlaceholder')}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              ></textarea>
            </div>
            
            {error && (
              <div className="text-red-500 text-center">
                {error}
              </div>
            )}
            
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-medium rounded-full hover:from-blue-600 hover:to-teal-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                disabled={!file || !extractedText || processingStatus !== ''}
              >
                {t('cvEnhancer.enhanceButton')}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default CVEnhancer;