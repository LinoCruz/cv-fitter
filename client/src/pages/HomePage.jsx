import React from 'react';
import HeaderHeroWrapper from '../components/layout/HeaderHeroWrapper';
import CVEnhancer from '../components/home/CVEnhancer';
import Footer from '../components/layout/Footer';

function HomePage() {
  return (
    <>
      <HeaderHeroWrapper />
      <main>
        <CVEnhancer />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;