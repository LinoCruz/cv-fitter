import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ChangesListing from './ChangesListing';
import Recommendations from './Recommendations';

const EnhancementResults = ({ result, originalFile, onReset }) => {
  const { t } = useTranslation();
  
  const handleDownload = () => {
    // Create a blob URL from the enhanced CV PDF data
    const blob = new Blob([result.enhancedCvPdf], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    // Determine the filename (use original file name with "enhanced-" prefix)
    const fileName = originalFile ? `enhanced-${originalFile.name}` : 'enhanced-cv.pdf';
    
    // Create a temporary anchor element and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle empty or missing data
  if (!result || (!result.changes && !result.recommendations && !result.enhancedCvPdf)) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">
          {t('enhancementResults.errorNoData')}
        </div>
        <button
          onClick={onReset}
          className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition-colors"
        >
          {t('enhancementResults.startOver')}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          {t('enhancementResults.title')}
        </h2>
        <p className="text-gray-600">
          {t('enhancementResults.description')}
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {t('enhancementResults.changes')}
          </h3>
          <ChangesListing changes={result.changes || []} />
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {t('enhancementResults.recommendations')}
          </h3>
          <Recommendations recommendations={result.recommendations || []} />
        </div>
      </div>
      
      {result.enhancedCvPdf && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {t('enhancementResults.preview')}
          </h3>
          
          {/* PDF preview container */}
          <div className="border border-gray-300 rounded-lg h-96 mb-4">
            <iframe
              src={URL.createObjectURL(new Blob([result.enhancedCvPdf], { type: 'application/pdf' }))}
              className="w-full h-full rounded-lg"
              title="Enhanced CV Preview"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-medium rounded-full hover:from-blue-600 hover:to-teal-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              {t('enhancementResults.download')}
            </button>
            <button
              onClick={onReset}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            >
              {t('enhancementResults.startOver')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancementResults;