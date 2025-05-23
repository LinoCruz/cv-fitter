// src/components/auth/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './auth.css';

const Login = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login form submitted:', formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <Link to="/">
              <div className="logo-circle"></div>
              <span>CV Fitter</span>
            </Link>
          </div>
          <div className="auth-nav">
            <Link to="/" className="auth-nav-link">
              {t.header.home}
            </Link>
            <Link to="/courses" className="auth-nav-link">
              {t.header.courses}
            </Link>
          </div>
        </div>

        <div className="auth-content">
          <div className="auth-form-container">
            <h2 className="auth-title">{t.auth.welcome}</h2>
            <h1 className="auth-subtitle">
              {t.auth.logInToAccount}<span className="accent-dot">.</span>
            </h1>
            <p className="auth-prompt">
              {t.auth.noAccount} <Link to="/signup" className="auth-link">{t.auth.signUp}</Link>
            </p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-form-field">
                <label htmlFor="email">{t.auth.email}</label>
                <div className="input-with-icon">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.auth.emailPlaceholder}
                    required
                  />
                  <svg className="field-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
              </div>

              <div className="auth-form-field">
                <label htmlFor="password">{t.auth.password}</label>
                <div className="input-with-icon">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={t.auth.passwordPlaceholder}
                    required
                  />
                  <button 
                    type="button" 
                    className="password-toggle" 
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <svg className="field-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg className="field-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="auth-form-options">
                <div className="remember-me">
                  <label className="checkbox-container">
                    <input 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={toggleRememberMe}
                    />
                    <span className="checkmark"></span>
                    {t.auth.rememberMe}
                  </label>
                </div>
                <Link to="/forgot-password" className="forgot-password">
                  {t.auth.forgotPassword}
                </Link>
              </div>

              <div className="auth-form-actions">
                <button type="button" className="auth-secondary-btn">
                  {t.auth.loginWithGoogle}
                </button>
                <button type="submit" className="auth-primary-btn">
                  {t.auth.logIn}
                </button>
              </div>
            </form>
          </div>

          <div className="auth-background">
            {/* Mountain scenery background image will be in CSS */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;