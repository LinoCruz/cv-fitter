import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './features.css';

function Features() {
  const { t } = useLanguage();
  
  return (
    <section className="features">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">{t.features.title}</h2>
          <p className="features-description">
            {t.features.subtitle}
          </p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-container blue">
              <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="feature-title">{t.features.feature1.title}</h3>
            <p className="feature-description">{t.features.feature1.description}</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-container teal">
              <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="feature-title">{t.features.feature2.title}</h3>
            <p className="feature-description">{t.features.feature2.description}</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-container purple">
              <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="feature-title">{t.features.feature3.title}</h3>
            <p className="feature-description">{t.features.feature3.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;