import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <div className="social-buttons">
        <a href="https://facebook.com" className="social-button social-button--facebook" aria-label="Facebook">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://linkedin.com" className="social-button social-button--linkedin" aria-label="LinkedIn">
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a href="https://instagram.com" className="social-button social-button--instagram" aria-label="Instagram">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://github.com" className="social-button social-button--github" aria-label="GitHub">
          <i className="fab fa-github"></i>
        </a>
      </div>
      <button className='footer-link' onClick={() => { window.location.href = 'https://websitli.com'; }}>&copy; 2024 Websitli. All rights reserved.</button>
    </footer>
  );
}

export default Footer;
