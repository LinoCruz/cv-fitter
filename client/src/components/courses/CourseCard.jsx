import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CourseCard = ({ course }) => {
  const { t } = useTranslation();

  // Default image if none provided
  const imageUrl = course.imageUrl || '/api/placeholder/400/250';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:transform hover:scale-105">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={course.title} 
          className="w-full h-48 object-cover"
        />
        
        {course.isFree && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded">
            {t('courseCard.free')}
          </div>
        )}

        {course.isRecommended && (
          <div className="absolute top-4 left-4 bg-blue-500 text-white px-2 py-1 text-xs font-bold rounded">
            {t('courseCard.recommended')}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {course.title}
          </h3>
          
          {course.level && (
            <span className={`text-xs font-medium px-2 py-1 rounded ${
              course.level === 'beginner' ? 'bg-green-100 text-green-800' :
              course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {course.level === 'beginner' ? t('courseCard.level.beginner') :
               course.level === 'intermediate' ? t('courseCard.level.intermediate') :
               t('courseCard.level.advanced')}
            </span>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
          </svg>
          <span>{course.duration || t('courseCard.durationNotSpecified')}</span>
        </div>
        
        <Link
          to={`/courses/${course.id}`}
          className="block w-full text-center bg-gradient-to-r from-blue-500 to-teal-400 text-white py-2 rounded hover:from-blue-600 hover:to-teal-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          {t('courseCard.viewCourse')}
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;