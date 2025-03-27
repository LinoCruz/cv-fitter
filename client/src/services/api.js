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

/**
 * Fetch courses based on filters
 * @param {Object} filters - Filter criteria for courses
 * @param {string} filters.searchTerm - Search term
 * @param {string} filters.category - Course category
 * @param {Array} filters.recommendationIds - IDs of recommended skills
 * @returns {Promise} - Promise with courses data
 */
export const fetchCourses = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters.searchTerm) {
      queryParams.append('search', filters.searchTerm);
    }
    
    if (filters.category) {
      queryParams.append('category', filters.category);
    }
    
    if (filters.recommendationIds && filters.recommendationIds.length > 0) {
      queryParams.append('recommendations', filters.recommendationIds.join(','));
    }
    
    const queryString = queryParams.toString();
    const endpoint = getEndpoint('/courses');
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

/**
 * Fetch a single course by ID
 * @param {string} courseId - Course ID
 * @returns {Promise} - Promise with course data
 */
export const fetchCourseById = async (courseId) => {
  try {
    const response = await api.get(getEndpoint(`/courses/${courseId}`));
    return response.data;
  } catch (error) {
    console.error(`Error fetching course ${courseId}:`, error);
    throw error;
  }
};

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise} - Promise with user data
 */
export const registerUser = async (userData) => {
  try {
    const response = await api.post(getEndpoint('/auth/register'), userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

/**
 * Login a user
 * @param {Object} credentials - User login credentials
 * @returns {Promise} - Promise with auth data
 */
export const loginUser = async (credentials) => {
  try {
    const response = await api.post(getEndpoint('/auth/login'), credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

/**
 * Login with Google
 * @param {string} token - Google auth token
 * @returns {Promise} - Promise with auth data
 */
export const loginWithGoogle = async (token) => {
  try {
    const response = await api.post(getEndpoint('/auth/google'), { token });
    return response.data;
  } catch (error) {
    console.error('Error logging in with Google:', error);
    throw error;
  }
};

// Add interceptor for handling auth tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;