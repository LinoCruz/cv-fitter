import React from 'react';
import myImgLogo from '../../assets/images/cv-landing.jpg';
import { useLanguage } from '../../context/LanguageContext';
import './hero.css';

function Hero() {
  const { t } = useLanguage();
  
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content-wrapper">
          <div className="hero-text-column">
            
            <h1 className="hero-title">
              {t.hero.title}
            </h1>
            <p className="hero-description">
              {t.hero.description2}
            </p>
            <div className="hero-buttons">
              <a href="#cv-enhancer" className="hero-button-primary">
                {t.hero.enhanceButton}
              </a>
            </div>
          </div>
          
          <div className="hero-image-column">
            <div className="hero-image-container">
              <img 
                src={myImgLogo} 
                alt="CV Enhancement" 
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;