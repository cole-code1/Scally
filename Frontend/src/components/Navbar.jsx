import React from 'react';
import { ShoppingCart, HelpCircle, Search } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="text-xl font-bold">LOGO</div>

      {/* Navigation Links */}
      <div className="flex space-x-6 text-sm font-medium text-gray-700">
        {['Men', 'Women', 'Kids', 'Accessories', 'Sale'].map(link => (
          <a href={`#${link.toLowerCase()}`} key={link} className="hover:text-black">
            {link}
          </a>
        ))}
      </div>

      {/* Search and Icons */}
      <div className="flex items-center space-x-4">
        {/* Search bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-full px-4 py-1 text-sm pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
        </div>

        {/* Cart Icon */}
        <ShoppingCart className="w-5 h-5 cursor-pointer" />

        {/* Help Icon */}
        <HelpCircle className="w-5 h-5 cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar;
