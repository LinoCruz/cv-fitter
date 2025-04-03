import React from 'react';
import HeaderHeroWrapper from '../components/layout/HeaderHeroWrapper';
import CVEnhancer from '../components/home/CVEnhancer';
import Features from '../components/home/Features';
import Footer from '../components/layout/Footer';

function HomePage() {
  return (
    <>
      <HeaderHeroWrapper />
      <main>
        <CVEnhancer />
        <Features />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;