import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

// import icon to top 
// import brandLogo from '../assets'

const Header = () => (
  <header className="header">
    <div className="brand-name">
      {/* <img
        src={brandLogo}
        alt="Sun & Whimsy Co Logo"
        className="brand-logo"
      /> */}
    </div>

    {/* // update if full site is used */}
    {/* <nav className="navigation">
      <Link to="/">Shop Our Products</Link>
      <Link to="/portfolio">Portfolio</Link>
      <Link to="/contact">Contact Us</Link>
      <Link to="/resume">Product</Link>
    </nav> */}
  </header>
);

export default Header;
