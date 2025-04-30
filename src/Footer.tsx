import React from 'react';
import { logEvent } from './services/firebase';

const Footer: React.FC = () => {
  const handleFooterLinkClick = () => {
    logEvent('ui_click', {
      element_type: 'link',
      element_id: 'privacy_policy',
    });
  };

  return (
    <footer>
      &copy; <span id="current-year">2025</span> Tyler Robinson |{' '}
      <a href="/privacy-policy.html" onClick={handleFooterLinkClick}>
        Privacy Policy
      </a>
    </footer>
  );
};

export default Footer;
