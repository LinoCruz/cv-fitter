
// Recommendations.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Recommendations = ({ recommendations }) => {
  const { t } = useTranslation();
  
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="text-gray-500 italic">
        {t('recommendations.noRecommendations')}
      </div>
    );
  }
  
  // Create a URL-friendly string of recommendation IDs for the courses page
  const recommendationIds = recommendations.map(rec => 
    typeof rec === 'string' ? rec : (rec.id || '')
  ).filter(id => id !== '');
  
  // Create search params for recommendations
  const hasValidRecommendations = recommendationIds.length > 0;
  const courseSearchParams = hasValidRecommendations 
    ? `?recommendations=${encodeURIComponent(JSON.stringify(recommendationIds))}` 
    : '';
  
  return (
    <div className="space-y-4">
      <ul className="space-y-2 text-gray-700">
        {recommendations.map((recommendation, index) => {
          // Handle both string recommendations and object recommendations
          const text = typeof recommendation === 'string' 
            ? recommendation 
            : (recommendation.text || '');
            
          return (
            <li key={index} className="flex">
              <span className="text-teal-500 mr-2">•</span>
              <span>{text}</span>
            </li>
          );
        })}
      </ul>
      
      {hasValidRecommendations && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Link
            to={`/courses${courseSearchParams}`}
            className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors"
          >
            {t('recommendations.browseCourses')}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Recommendations;