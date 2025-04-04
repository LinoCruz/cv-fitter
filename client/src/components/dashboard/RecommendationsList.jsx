import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './recommendations-list.css';

const RecommendationsList = ({ recommendations }) => {
  const { t } = useTranslation();
  const [expandedRecommendation, setExpandedRecommendation] = useState(null);

  const toggleRecommendation = (index) => {
    if (expandedRecommendation === index) {
      setExpandedRecommendation(null);
    } else {
      setExpandedRecommendation(index);
    }
  };

  return (
    <div className="recommendations-list">
      {recommendations.length === 0 ? (
        <p className="no-data">{t('dashboard.noRecommendations')}</p>
      ) : (
        recommendations.map((recommendation, index) => (
          <div 
            key={index} 
            className={`recommendation-item ${expandedRecommendation === index ? 'expanded' : ''}`}
          >
            <div 
              className="recommendation-header"
              onClick={() => toggleRecommendation(index)}
            >
              <h3>{recommendation.title}</h3>
              <span className="toggle-icon">
                {expandedRecommendation === index ? '−' : '+'}
              </span>
            </div>
            
            {expandedRecommendation === index && (
              <div className="recommendation-content">
                <p className="recommendation-description">{recommendation.description}</p>
                
                {recommendation.courses && recommendation.courses.length > 0 && (
                  <div className="recommended-courses">
                    <h4>{t('dashboard.suggestedCourses')}</h4>
                    <ul>
                      {recommendation.courses.map((course, courseIndex) => (
                        <li key={courseIndex}>
                          <Link to={course.url} className="course-link">
                            {course.title}
                            <span className="arrow-icon">→</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default RecommendationsList;