// api.js
import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// State to track the current language
let currentLanguage = localStorage.getItem('language') || 'en';

// Listen for language changes
window.addEventListener('languageChanged', (event) => {
  currentLanguage = event.detail.language;
});

// Get the appropriate endpoint based on language
const getEndpoint = (endpoint) => {
  return currentLanguage === 'es' ? `/es${endpoint}` : endpoint;
};

/**
 * Enhance CV with job description
 * @param {FormData} formData - FormData containing CV file, extracted text, and job description
 * @returns {Promise} - Promise with enhancement result
 */
export const enhanceCV = async (formData) => {
  try {
    const response = await api.post(getEndpoint('/enhance-cv'), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error enhancing CV:', error);
    throw error;
  }
};

export default api;