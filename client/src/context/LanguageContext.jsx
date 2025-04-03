import React, { createContext, useState, useContext, useEffect } from 'react';

// Import translations
import enTranslations from '../locales/en/translation.json';
import esTranslations from '../locales/es/translation.json';

// Create context
const LanguageContext = createContext();

// Define all available translations
const translations = {
  en: enTranslations,
  es: esTranslations
};

// Language provider component
export function LanguageProvider({ children }) {
  // Get initial language from localStorage or default to 'en'
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });

  // Current translations based on selected language
  const [t, setT] = useState(translations[language]);

  // Update localStorage and translations when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    setT(translations[language]);
    // You could add additional logic here like changing the HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  // Switch language function
  const changeLanguage = (newLanguage) => {
    console.log("Changing language to:", newLanguage); // Add this for debugging
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook for using the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageContext;