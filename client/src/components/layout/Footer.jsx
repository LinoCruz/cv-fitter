import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './footer.css';

function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <a href="/" className="footer-logo">CV Fitter</a>
            <p className="footer-copyright">
              © {new Date().getFullYear()} CV Fitter. {t.footer.rights}
            </p>
          </div>
          
          <div className="footer-links">
            <a href="/about" className="footer-link">
              {t.footer.about}
            </a>
            <a href="/privacy" className="footer-link">
              {t.footer.privacy}
            </a>
            <a href="/terms" className="footer-link">
              {t.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;