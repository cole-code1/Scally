import React from 'react';
import Button from './Button';

const PromotionalBanner = () => {
  return (
    <section className="my-16 relative overflow-hidden rounded-xl">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/5872353/pexels-photo-5872353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')",
        }}
      >
        <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>
      </div>
      
      <div className="relative py-12 md:py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Summer Sale — Up to 50% Off
          </h2>
          <p className="text-white text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Elevate your wardrobe with premium pieces at exclusive prices. Limited time only.
          </p>
          <Button primary className="mx-auto">Shop the Sale</Button>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;