import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './loading-overlay.css';

const LoadingOverlay = () => {
  const { t } = useTranslation();
  const [loadingMessage, setLoadingMessage] = useState(0);
  
  const messages = [
    t('loading.analyzing'),
    t('loading.improving'),
    t('loading.matching'),
    t('loading.finalizing')
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingMessage((prev) => (prev + 1) % messages.length);
    }, 2500);
    
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loading-animation">
          <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
          <div className="pulse-ring"></div>
        </div>
        
        <h2 className="loading-title">{t('loading.title')}</h2>
        <p className="loading-message">{messages[loadingMessage]}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;