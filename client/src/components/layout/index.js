import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { LanguageProvider } from '../../context/LanguageContext';

function Layout({ children }) {
  return (
    <LanguageProvider>
      <div className="layout">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export { Header, Footer };
export default Layout;