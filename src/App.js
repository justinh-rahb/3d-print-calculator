import React, { useState, useEffect } from 'react';
import './App.css';
import PrintQuoteCalculator from './components/PrintQuoteCalculator';
import { Github, Moon, Sun } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  
  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);
  
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    // Dispatch custom event to notify components
    document.body.dispatchEvent(new Event('darkModeChange'));
  };

  return (
    <div className="App">
      <div className="header-container">
        <a 
          href="https://github.com/justinh-rahb/3d-print-calculator" 
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
          title="View on GitHub"
          aria-label="View source code on GitHub"
        >
          <Github size={20} />
        </a>
        <button 
          onClick={toggleDarkMode} 
          className="theme-toggle" 
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
      <PrintQuoteCalculator darkMode={darkMode} />
    </div>
  );
}

export default App;