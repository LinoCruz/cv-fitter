import React from 'react';
import { useTranslation } from 'react-i18next';
import ChangesListing from './ChangesListing';

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
  if (!result || (!result.changes && !result.recommendations && !result.enhanced_cv_html)) {
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
      <div className="grid md:grid-cols-1 gap-6">
        {/* Right: Enhanced CV Results (HTML and changes) */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4" style={{ color: '#f59e42' }}>
            Enhanced CV Results
          </h3>
          {/* Render enhanced CV HTML */}
          <div className="border border-gray-300 rounded-lg mb-4 p-4 overflow-auto" style={{ maxHeight: '500px', background: '#f9fafb' }}>
            <div dangerouslySetInnerHTML={{ __html: result.enhanced_cv_html.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&') }} />
          </div>
          {/* List of changes made */}
          <div className="bg-gray-50 rounded-lg p-4 mt-4">
            <h4 className="font-semibold text-gray-700 mb-2">List of Changes Made</h4>
            <ChangesListing changes={result.changes || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancementResults;