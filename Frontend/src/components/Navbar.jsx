import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, ShoppingCart } from 'lucide-react';
import './Navbar.css'; // Ensure this is imported
import logo from '../assets/logo.png'; // Adjust the path as necessary
const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-inner">
            {/* Menu Icon */}
            <div className="navbar-left">
              <Menu className="menu-icon" />
            </div>

            {/* Logo */}
            <Link to="/" className="navbar-logo">
              <img src={logo} alt="Logo" className="navbar-logo" />
            </Link>
            {/* Right Section */}
            <div className="navbar-right">
              {/* Search */}
              <div className="navbar-search-group">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="navbar-search-input"
                />
                <Search className="navbar-search-icon" />
              </div>

              {/* Cart */}
              <Link to="/cart" className="navbar-cart-link">
                <ShoppingCart className="cart-icon" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
