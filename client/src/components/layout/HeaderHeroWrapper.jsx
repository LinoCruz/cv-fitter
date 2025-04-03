import React from 'react';
import Header from './Header';
import Hero from '../home/Hero';
import './unified-gradient.css';

function HeaderHeroWrapper() {
  return (
    <div className="gradient-background">
      <Header />
      <Hero />
    </div>
  );
}

export default HeaderHeroWrapper;