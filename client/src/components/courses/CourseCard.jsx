// src/components/courses/CourseCard.jsx
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './course-card.css';

const CourseCard = ({ course, onViewDetails }) => {
  const { t } = useLanguage();
  
  // Format price display
  const formatPrice = (price) => {
    return price === 0 ? t.courses.courseDetails.free : `$${price.toFixed(2)}`;
  };
  
  // Format date to display only month and year
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
  };

  // Map category to color
  const getCategoryColor = (category) => {
    const categoryColors = {
      'tech': '#4285F4', // Blue
      'marketing': '#34A853', // Green
      'social media': '#FBBC05', // Yellow
      'it': '#EA4335', // Red
      'design': '#9C27B0', // Purple
      'default': '#757575' // Grey
    };
    
    return categoryColors[category] || categoryColors.default;
  };

  // Get translated category name
  const getCategoryName = (category) => {
    const categoryMap = {
      'tech': t.courses.categories.tech,
      'marketing': t.courses.categories.marketing,
      'social media': t.courses.categories.socialMedia,
      'it': t.courses.categories.it,
      'design': t.courses.categories.design
    };
    
    return categoryMap[category] || category;
  };

  // Get translated level name
  const getLevelName = (level) => {
    const levelMap = {
      'beginner': t.courses.levels.beginner,
      'intermediate': t.courses.levels.intermediate,
      'advanced': t.courses.levels.advanced
    };
    
    return levelMap[level] || level;
  };

  return (
    <div className="course-card" onClick={() => onViewDetails(course)}>
      <div className="course-card-image-container">
        <div 
          className="course-card-category-badge"
          style={{ backgroundColor: getCategoryColor(course.category) }}
        >
          {getCategoryName(course.category)}
        </div>
        <img 
          src={course.image || "/api/placeholder/400/320"} 
          alt={course.title} 
          className="course-card-image"
        />
      </div>
      
      <div className="course-card-content">
        <h3 className="course-card-title">{course.title}</h3>
        <p className="course-card-institution">{course.institution}</p>
        <p className="course-card-description">{course.description}</p>
        
        <div className="course-card-details">
          <div className="course-card-detail">
            <span className="detail-label">{t.courses.courseDetails.level}: </span>
            <span className="detail-value">{getLevelName(course.level)}</span>
          </div>
          <div className="course-card-detail">
            <span className="detail-label">{t.courses.courseDetails.duration}: </span>
            <span className="detail-value">{course.duration}</span>
          </div>
          <div className="course-card-detail">
            <span className="detail-label">{t.courses.courseDetails.published}: </span>
            <span className="detail-value">{formatDate(course.publishedDate)}</span>
          </div>
        </div>
      </div>
      
      <div className="course-card-footer">
        <span className="course-card-price">{formatPrice(course.price)}</span>
        <button className="course-card-btn">{t.courses.viewDetails}</button>
      </div>
    </div>
  );
};

export default CourseCard;