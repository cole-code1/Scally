import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import CategoriesSection from '../components/CategoriesSection';
import PromotionalBanner from '../components/PromotionalBanner';
import NewArrivalsSection from '../components/NewArrivalsSection';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Main content */}
      <main className="flex-grow">
        <HeroSection />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoriesSection />
          <PromotionalBanner />
          <NewArrivalsSection />
          <Newsletter />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;