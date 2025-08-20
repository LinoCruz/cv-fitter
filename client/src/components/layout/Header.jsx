import React from 'react';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../../context/LanguageContext';
import './header.css';

function Header() {
  const { language, changeLanguage } = useLanguage();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-nav-wrapper">
          {/* Logo */}
          <div>
            <a href="/" className="header-logo">
              CV Fitter
            </a>
          </div>

          {/* Navigation */}
          <nav className="header-nav">
            <div className="header-nav-item header-language-toggle">
              <LanguageToggle 
                currentLanguage={language}
                onLanguageChange={changeLanguage}
              />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;