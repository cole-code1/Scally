import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Shop',
      links: ['Men', 'Women', 'Kids', 'Accessories', 'Sale']
    },
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Press', 'Sustainability']
    },
    {
      title: 'Help',
      links: ['Contact Us', 'Shipping', 'Returns', 'FAQs']
    },
    {
      title: 'Legal',
      links: ['Terms of Service', 'Privacy Policy', 'Cookie Policy']
    }
  ];
  
  return (
    <footer className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              {/* Social icons */}
              {['facebook', 'instagram', 'twitter', 'pinterest'].map((social) => (
                <a key={social} href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                  <span className="sr-only">{social}</span>
                  <div className="h-6 w-6 bg-current rounded-full"></div>
                </a>
              ))}
            </div>
            <p className="mt-8 md:mt-0 md:order-1 text-gray-500 text-sm">
              &copy; {year} LUXEMODE. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;