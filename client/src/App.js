import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import AuthPage from './pages/AuthPage';
import { LanguageProvider } from './context/LanguageContext';

// Import global styles
import './styles/globals.css';

// You should import all your component CSS files here if using centralized imports
// or import them directly in each component

function App() {
  

  return (
    <LanguageProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage isSignUp={true} />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;