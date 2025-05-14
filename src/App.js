import React from 'react';
import './App.css';
import PrintQuoteCalculator from './components/PrintQuoteCalculator';
import { Github } from 'lucide-react';

function App() {
  return (
    <div className="App">
      <a 
        href="https://github.com/justinh-rahb/3d-print-calculator" 
        target="_blank"
        rel="noopener noreferrer"
        className="github-link"
      >
        <Github size={24} />
        <span>View on GitHub</span>
      </a>
      <PrintQuoteCalculator />
    </div>
  );
}

export default App;