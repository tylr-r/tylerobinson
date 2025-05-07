import { useEffect, useState } from 'react';
import './App.css';
import Footer from './Footer';
import Messenger_logo from './assets/Messenger_logo.svg';
import WhatsApp_logo from './assets/WhatsApp_logo.svg';
import GithubIcon from './components/Icons/GithubIcon';
import ToggleButton from './components/ToggleButton';
import useSystemDarkMode from './hooks/useSystemDarkMode';
import { logEvent } from './services/firebase';

function App() {
  const isDarkMode = useSystemDarkMode();
  const [currentSublink, setCurrentSublink] = useState('');

  const tabClick = (tab: string): void => {
    setCurrentSublink((prev) => (prev === tab ? '' : tab));
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDarkMode ? 'dark' : 'light',
    );
  }, [isDarkMode]);

  useEffect(() => {
    // Set current year
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear().toString();
    }

    // On load animation
    const timeout = setTimeout(() => {
      const logoContainer = document.getElementById('logo-container');
      if (logoContainer) {
        logoContainer.classList.add('animate');
      }
    }, 800);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // Track link clicks with generic handler
  const handleLinkClick = (platform: string) => {
    logEvent('ui_click', {
      element_type: 'link',
      element_id: platform,
    });
  };

  return (
    <>
      <div id="logo-container">
        <div id="tyler-text">
          <span className="left-part">Ty</span>
          <span id="slash">/</span>
          <span className="right-part">r</span>
        </div>
      </div>

      <div id="main-tiles">
        <ToggleButton
          label="helix project"
          id="helix-button"
          isActive={currentSublink === 'helix'}
          onClick={() => tabClick('helix')}
        />
        <ToggleButton
          label="resume"
          id="resume-button"
          isActive={currentSublink === 'resume'}
          onClick={() => tabClick('resume')}
        />
        <ToggleButton label="portfolio" id="portfolio-button" isDisabled />
      </div>

      <div id="sublinks">
        <div
          id="resume"
          className={`links ${currentSublink === 'resume' ? 'visible' : ''}`}
        >
          <a
            className="link"
            href="/Tyler Robinson Resume 2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleLinkClick('resume')}
          >
            <span>Download &#x2197;</span>
          </a>
        </div>
        <div
          id="links"
          className={`links ${currentSublink === 'helix' ? 'visible' : ''}`}
        >
          <a
            className="social-link"
            href="https://m.me/tylrcreative"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleLinkClick('messenger')}
          >
            <img src={Messenger_logo} alt="Chat Tylr on Messenger" />
          </a>
          <a
            className="social-link"
            href="https://wa.me/message/4HK74L3CLAAVE1"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleLinkClick('whatsapp')}
          >
            <img src={WhatsApp_logo} alt="Chat Tylr on WhatsApp" />
          </a>
          <a
            className="social-link"
            href="https://github.com/tylr-r/helix"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleLinkClick('github')}
          >
            <GithubIcon
              className="github-logo"
              fill={isDarkMode ? '#FFFFFF' : '#000000'}
            />
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
