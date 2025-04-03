// src/pages/AuthPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Login from '../components/auth/Login';
import SignUp from '../components/auth/SignUp';

const AuthPage = ({ isSignUp = false }) => {
  const location = useLocation();
  
  // Check if we're on the signup path, either through props or through URL
  const isSignUpPath = isSignUp || location.pathname === '/signup';
  
  return isSignUpPath ? <SignUp /> : <Login />;
};

export default AuthPage;