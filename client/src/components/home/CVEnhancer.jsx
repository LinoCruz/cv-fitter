import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './cvenhancer.css';

function CVEnhancer() {
  const { t } = useLanguage();
  const [file, setFile] = useState(null);
  
  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  return (
    <section id="cv-enhancer" className="cv-enhancer">
      <div className="cv-enhancer-container">
        <div className="cv-enhancer-card">
          <h2 className="cv-enhancer-title">
            {t.cvEnhancer.title}
          </h2>
          
          <div className="cv-enhancer-form-group">
            <label className="cv-enhancer-label">
              {t.cvEnhancer.uploadLabel}
            </label>
            <div className="cv-enhancer-upload-wrapper">
              <label className="cv-enhancer-upload-area">
                <div className="cv-enhancer-upload-content">
                  <svg xmlns="http://www.w3.org/2000/svg" className="cv-enhancer-upload-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="cv-enhancer-upload-text">
                    {file ? file.name : t.cvEnhancer.uploadText}
                  </p>
                </div>
                <input 
                  type="file" 
                  className="cv-enhancer-upload-input" 
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                />
              </label>
            </div>
          </div>
          
          <div className="cv-enhancer-form-group">
            <label htmlFor="job-description" className="cv-enhancer-label">
              {t.cvEnhancer.jobDescriptionLabel}
            </label>
            <textarea
              id="job-description"
              rows="6"
              className="cv-enhancer-textarea"
              placeholder={t.cvEnhancer.jobDescriptionPlaceholder}
            ></textarea>
          </div>
          
          <div className="cv-enhancer-button-container">
            <button
              type="button"
              className="cv-enhancer-button"
            >
              {t.cvEnhancer.buttonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CVEnhancer;