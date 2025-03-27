import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-2xl font-bold text-blue-500">CV Fitter</Link>
            <p className="text-gray-600 mt-2">
              {t('footer.copyright', { year: currentYear })}
            </p>
          </div>

          <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-6">
            <Link to="/about" className="text-gray-600 hover:text-blue-500 transition-colors">
              {t('footer.about')}
            </Link>
            <Link to="/courses" className="text-gray-600 hover:text-blue-500 transition-colors">
              {t('footer.courses')}
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-blue-500 transition-colors">
              {t('footer.privacyPolicy')}
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-blue-500 transition-colors">
              {t('footer.termsOfService')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;