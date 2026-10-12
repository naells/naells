import React from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="profile-footer">
      <p className="footer-text">&copy; {currentYear} Naell</p>
    </footer>
  );
};
