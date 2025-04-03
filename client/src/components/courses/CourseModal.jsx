// src/components/courses/CourseModal.jsx
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './course-modal.css';

const CourseModal = ({ course, onClose }) => {
  const { t } = useLanguage();
  const modalRef = useRef(null);
  
  // Format price display
  const formatPrice = (price) => {
    return price === 0 ? t.courses.courseDetails.free : `$${price.toFixed(2)}`;
  };
  
  // Format date to a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
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
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden'; // Prevent scrolling of background
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto'; // Restore scrolling
    };
  }, [onClose]);
  
  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="course-modal" ref={modalRef}>
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        
        <div className="modal-image-container">
          <img 
            src={course.image || "/api/placeholder/800/400"} 
            alt={course.title} 
            className="modal-image"
          />
          <div className="modal-category-badge">
            {getCategoryName(course.category)}
          </div>
        </div>
        
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">{course.title}</h2>
            <p className="modal-institution">{course.institution}</p>
            <div className="modal-metadata">
              <span className="modal-level">{getLevelName(course.level)}</span>
              <span className="modal-duration">{course.duration}</span>
              <span className="modal-published">{t.courses.courseDetails.published}: {formatDate(course.publishedDate)}</span>
            </div>
          </div>
          
          <div className="modal-section">
            <h3 className="section-title">{t.courses.courseDetails.description}</h3>
            <p className="modal-description">{course.description}</p>
          </div>
          
          {course.highlights && (
            <div className="modal-section">
              <h3 className="section-title">{t.courses.courseDetails.highlights}</h3>
              <ul className="modal-highlights">
                {course.highlights.map((highlight, index) => (
                  <li key={index} className="highlight-item">{highlight}</li>
                ))}
              </ul>
            </div>
          )}
          
          {course.curriculum && (
            <div className="modal-section">
              <h3 className="section-title">{t.courses.courseDetails.curriculum}</h3>
              <ol className="modal-curriculum">
                {course.curriculum.map((item, index) => (
                  <li key={index} className="curriculum-item">{item}</li>
                ))}
              </ol>
            </div>
          )}
          
          <div className="modal-footer">
            <div className="modal-price">{formatPrice(course.price)}</div>
            <a 
              href={course.institutionUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="modal-enroll-btn"
            >
              {t.courses.courseDetails.enrollNow}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;