import React from 'react';
import Header from './Header';
import HeaderHeroWrapper from './HeaderHeroWrapper';
import Footer from './Footer';
import { LanguageProvider } from '../../context/LanguageContext';

function Layout({ children, showHero = true }) {
  return (
    <LanguageProvider>
      <div className="layout">
        {showHero ? (
          <HeaderHeroWrapper />
        ) : (
          <div className="gradient-background">
            <Header />
          </div>
        )}
        <main>{children}</main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export { Header, Footer, HeaderHeroWrapper };
export default Layout;