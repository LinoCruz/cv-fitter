import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './improvements-list.css';

const ImprovementsList = ({ improvements }) => {
  const { t } = useTranslation();
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className="improvements-list">
      {improvements.length === 0 ? (
        <p className="no-data">{t('dashboard.noImprovements')}</p>
      ) : (
        improvements.map((improvement, index) => (
          <div 
            key={index} 
            className={`improvement-section ${expandedSection === improvement.section ? 'expanded' : ''}`}
          >
            <div 
              className="improvement-header"
              onClick={() => toggleSection(improvement.section)}
            >
              <h3>{improvement.section}</h3>
              <span className="toggle-icon">
                {expandedSection === improvement.section ? '−' : '+'}
              </span>
            </div>
            
            {expandedSection === improvement.section && (
              <ul className="improvement-items">
                {improvement.changes.map((change, changeIndex) => (
                  <li key={changeIndex}>{change}</li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ImprovementsList;