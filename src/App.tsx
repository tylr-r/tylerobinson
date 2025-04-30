import './App.css';
import Footer from './Footer';
import Messenger_logo from './assets/Messenger_logo.svg';
import WhatsApp_logo from './assets/WhatsApp_logo.svg';
import ToggleButton from './ToggleButton';
import { useEffect, useState } from 'react';
import GithubIcon from './components/Icons/GithubIcon';
import useSystemDarkMode from './hooks/useSystemDarkMode';
import { logEvent } from './services/firebase';

function App() {
  const [isHelixLinksActive, setIsHelixLinksActive] = useState(false);
  const isDarkMode = useSystemDarkMode();

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

  const openResume = () => {
    window.open(
      '/Tyler Robinson Resume 2025.pdf',
      '_blank',
      'noopener,noreferrer',
    );
    handleLinkClick('resume');
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
          onClick={() => setIsHelixLinksActive((prevState) => !prevState)}
        />
        <ToggleButton label="resume" id="resume-button" onClick={openResume} />
        <ToggleButton label="portfolio" id="portfolio-button" isDisabled />
      </div>

      <div id="chat-links" className={isHelixLinksActive ? 'visible' : ''}>
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
      <Footer />
    </>
  );
}

export default App;
