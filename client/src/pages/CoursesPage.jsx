// src/pages/CoursesPage.jsx
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CoursesList from '../components/courses/CoursesList';
import './courses-page.css';

const CoursesPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="courses-page">
      <div className="header-container-wrapper">
        <Header />
      </div>
      
      <main className="courses-page-main">
        <div className="courses-banner">
          <div className="banner-content">
            <h1 className="banner-title">{t.courses.bannerTitle}</h1>
            <p className="banner-subtitle">{t.courses.bannerSubtitle}</p>
          </div>
        </div>
        
        <CoursesList />
      </main>
      
      <Footer />
    </div>
  );
};

export default CoursesPage;