import React from 'react';
import CVForm from './components/CVForm/CVForm';
import './styles/globals.css';

function App() {
  return (
    <div>
      <header>
        <h1>CV Fitter</h1>
      </header>
      <CVForm />
      <p className='author'>Author: <a href="https://www.linkedin.com/in/lino-cruz/">Lino Cruz</a></p>
    </div>
  );
}

export default App;
