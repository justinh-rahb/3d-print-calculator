import React from 'react';
import './App.css';
import PrintQuoteCalculator from './components/PrintQuoteCalculator';
import { Github } from 'lucide-react';

function App() {
  return (
    <div className="App">
      <div className="header-container">
        <a 
          href="https://github.com/justinh-rahb/3d-print-calculator" 
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
          title="View on GitHub"
        >
          <Github size={20} />
        </a>
      </div>
      <PrintQuoteCalculator />
    </div>
  );
}

export default App;