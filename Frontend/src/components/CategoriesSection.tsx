import React from 'react';

const categories = [
  {
    id: 1,
    name: 'Men',
    image: 'https://images.pexels.com/photos/2955375/pexels-photo-2955375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    id: 2,
    name: 'Women',
    image: 'https://images.pexels.com/photos/5693890/pexels-photo-5693890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    id: 3,
    name: 'Kids',
    image: 'https://images.pexels.com/photos/5905445/pexels-photo-5905445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    id: 4,
    name: 'Accessories',
    image: 'https://images.pexels.com/photos/1460838/pexels-photo-1460838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  }
];

const CategoriesSection = () => {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif font-bold text-gray-900">Shop by Category</h2>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Explore our carefully curated collections for every occasion
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div 
            key={category.id}
            className="group relative overflow-hidden rounded-lg shadow-md h-64 cursor-pointer"
          >
            {/* Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${category.image})` }}
            ></div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300 group-hover:translate-y-0">
              <h3 className="text-xl font-serif font-bold text-white mb-2">{category.name}</h3>
              <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Explore Collection
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;