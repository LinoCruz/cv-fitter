import React from 'react';
import { useTranslation } from 'react-i18next';

const LoadingAnimation = ({ message }) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Loading spinner */}
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="animate-spin w-20 h-20 border-4 border-blue-200 rounded-full"></div>
          <div className="animate-spin w-20 h-20 border-4 border-transparent border-t-blue-500 rounded-full absolute top-0 left-0"></div>
        </div>
      </div>
      
      {/* Loading message */}
      <div className="text-center">
        <h3 className="text-xl font-medium text-gray-800 mb-2">
          {message || t('loading.defaultMessage')}
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          {t('loading.subMessage')}
        </p>
      </div>
      
      {/* Loading progress animation */}
      <div className="mt-8 w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-teal-400 rounded-full"
          style={{
            width: '30%',
            animation: 'loading-progress 2s ease-in-out infinite alternate'
          }}
        ></div>
      </div>
      
      {/* Add keyframes animation in a style tag */}
      <style jsx>{`
        @keyframes loading-progress {
          0% {
            width: 15%;
            margin-left: 0%;
          }
          50% {
            width: 40%;
          }
          100% {
            width: 25%;
            margin-left: 75%;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;