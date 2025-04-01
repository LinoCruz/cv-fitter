import React from 'react';
import { Header, Footer } from './components/layout';
import HomePage from './pages/HomePage';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <HomePage />
      </main>
      <Footer />
    </div>
    </LanguageProvider>
  );
}

export default App;