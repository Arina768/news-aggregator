import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Your News Aggregator</p>
      </div>
    </footer>
  );
};

export default Footer;
