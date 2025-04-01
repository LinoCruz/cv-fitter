import React, { useState, useRef, useEffect } from 'react';
import './language-toggle.css';

function LanguageToggle({ currentLanguage, onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const selectLanguage = (language) => {
    onLanguageChange(language);
    setIsOpen(false);
  };
  
  return (
    <div className="language-toggle" ref={dropdownRef}>
      <button 
        className="language-toggle-button" 
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <svg className="language-toggle-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span className="language-toggle-current">
          {currentLanguage === 'en' ? 'English' : 'Español'}
        </span>
        <svg 
          className={`language-toggle-arrow ${isOpen ? 'open' : ''}`} 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div className={`language-toggle-dropdown ${isOpen ? 'open' : ''}`}>
        <div 
          className={`language-toggle-option ${currentLanguage === 'en' ? 'active' : ''}`}
          onClick={() => selectLanguage('en')}
        >
          <span className="language-toggle-flag">🇺🇸</span>
          <span className="language-toggle-label">English</span>
        </div>
        <div 
          className={`language-toggle-option ${currentLanguage === 'es' ? 'active' : ''}`}
          onClick={() => selectLanguage('es')}
        >
          <span className="language-toggle-flag">🇪🇸</span>
          <span className="language-toggle-label">Español</span>
        </div>
      </div>
    </div>
  );
}

export default LanguageToggle;