import React from 'react';
import { useTranslation } from 'react-i18next';
import './cv-preview.css';

const CVPreview = ({ html }) => {
  const { t } = useTranslation();

  return (
    <div className="cv-preview-container">
      <div className="cv-preview-header">
        <h2>{t('dashboard.enhancedCV')}</h2>
        <div className="cv-preview-actions">
          <button className="btn-primary">{t('dashboard.download')}</button>
        </div>
      </div>
      <div 
        className="cv-preview-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default CVPreview;