// src/components/courses/CoursesList.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import CourseCard from './CourseCard';
import CourseModal from './CourseModal';
import { coursesData, categories, priceRanges } from '../../data/coursesData';
import './courses-list.css';

const CoursesList = () => {
  const { t } = useLanguage();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [visibleCourses, setVisibleCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const observer = useRef();
  const coursesPerPage = 6;

  // Initialize with dummy data
  useEffect(() => {
    // Sort courses by published date (newest first)
    const sortedCourses = [...coursesData].sort((a, b) => 
      new Date(b.publishedDate) - new Date(a.publishedDate)
    );
    
    setCourses(sortedCourses);
    setFilteredCourses(sortedCourses);
    setVisibleCourses(sortedCourses.slice(0, coursesPerPage));
  }, []);

  // Apply filters when they change
  useEffect(() => {
    setLoading(true);
    
    let filtered = [...courses];
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(course => course.category === categoryFilter);
    }
    
    // Apply price filter
    if (priceFilter !== 'all') {
      const range = priceRanges.find(range => range.id === priceFilter);
      if (range) {
        filtered = filtered.filter(course => 
          course.price >= range.min && course.price <= range.max
        );
      }
    }
    
    // Apply search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(query) || 
        course.description.toLowerCase().includes(query) ||
        course.institution.toLowerCase().includes(query)
      );
    }
    
    setFilteredCourses(filtered);
    setPage(1);
    setVisibleCourses(filtered.slice(0, coursesPerPage));
    setLoading(false);
  }, [categoryFilter, priceFilter, searchQuery, courses]);

  // Load more courses when user scrolls to the bottom
  const loadMoreCourses = useCallback(() => {
    if (loading) return;
    
    const nextPage = page + 1;
    const nextCourses = filteredCourses.slice(0, nextPage * coursesPerPage);
    
    setVisibleCourses(nextCourses);
    setPage(nextPage);
  }, [loading, page, filteredCourses, coursesPerPage]);

  // Set up intersection observer for infinite scroll
  const lastCourseElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && visibleCourses.length < filteredCourses.length) {
        loadMoreCourses();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, loadMoreCourses, visibleCourses.length, filteredCourses.length]);

  // Handle view details click
  const handleViewDetails = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCourse(null);
  };

  // Get translated category name
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return '';
    
    const categoryMap = {
      'all': t.courses.filters.allCourses,
      'tech': t.courses.categories.tech,
      'marketing': t.courses.categories.marketing,
      'social media': t.courses.categories.socialMedia,
      'it': t.courses.categories.it,
      'design': t.courses.categories.design
    };
    
    return categoryMap[category.id] || category.name;
  };

  // Get translated price range name
  const getPriceRangeName = (rangeId) => {
    const range = priceRanges.find(r => r.id === rangeId);
    if (!range) return '';
    
    const priceMap = {
      'all': t.courses.filters.allPrices,
      'free': t.courses.filters.freeCourses,
      'under-50': t.courses.filters.underFifty,
      '50-100': t.courses.filters.fiftyToHundred,
      '100-150': t.courses.filters.hundredToOneFifty,
      'over-150': t.courses.filters.overOneFifty
    };
    
    return priceMap[range.id] || range.name;
  };

  return (
    <div className="courses-container">
      <div className="courses-header">
        <h2 className="courses-title">{t.courses.pageTitle}</h2>
        <p className="courses-subtitle">{t.courses.pageSubtitle}</p>
      </div>
      
      <div className="courses-filters">
        <div className="search-container">
          <input
            type="text"
            placeholder={t.courses.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-container">
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {getCategoryName(category.id)}
              </option>
            ))}
          </select>
          
          <select 
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="filter-select"
          >
            {priceRanges.map(range => (
              <option key={range.id} value={range.id}>
                {getPriceRangeName(range.id)}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {filteredCourses.length === 0 ? (
        <div className="no-courses">
          <p>{t.courses.noCoursesFound}</p>
        </div>
      ) : (
        <>
          <div className="courses-results">
            <p className="results-count">
              {filteredCourses.length} {filteredCourses.length === 1 ? t.courses.courseFound : t.courses.coursesFound}
            </p>
          </div>
          
          <div className="courses-grid">
            {visibleCourses.map((course, index) => {
              // Add ref to last element for infinite scrolling
              if (index === visibleCourses.length - 1) {
                return (
                  <div ref={lastCourseElementRef} key={course.id} className="course-grid-item">
                    <CourseCard course={course} onViewDetails={handleViewDetails} />
                  </div>
                );
              } else {
                return (
                  <div key={course.id} className="course-grid-item">
                    <CourseCard course={course} onViewDetails={handleViewDetails} />
                  </div>
                );
              }
            })}
          </div>
          
          {loading && (
            <div className="loading-indicator">
              <div className="loading-spinner"></div>
              <p>{t.courses.loadingMore}</p>
            </div>
          )}
        </>
      )}
      
      {showModal && selectedCourse && (
        <CourseModal 
          course={selectedCourse} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default CoursesList;