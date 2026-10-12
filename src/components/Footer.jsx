import React from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="profile-footer">
      <div className="footer-content">
        <p className="footer-credits">
          Made with <span className="heart-pulse">❤️</span> for{" "}
          <strong className="footer-name">Naell</strong>
        </p>
        <div className="footer-meta">
          <span>&copy; {currentYear} Naell • All rights reserved</span>
          <span className="dot-divider">•</span>
          <a
            href="https://github.com/naells/naells"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Source Code
          </a>
        </div>
      </div>
    </footer>
  );
};
