import React from 'react';
import HeaderHeroWrapper from '../components/layout/HeaderHeroWrapper';
import WelcomeVideoBlock from '../components/home/WelcomeVideoBlock';
import CVEnhancer from '../components/home/CVEnhancer';
import Footer from '../components/layout/Footer';

function HomePage() {
  return (
    <>
      <HeaderHeroWrapper />
      <WelcomeVideoBlock />
      <main>
        <CVEnhancer />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;