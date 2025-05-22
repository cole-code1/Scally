import React from 'react';

const products = [
  {
    id: 1,
    name: 'Classic Oxford Shirt',
    price: 79.99,
    image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    category: 'Men'
  },
  {
    id: 2,
    name: 'Silk Maxi Dress',
    price: 129.99,
    image: 'https://images.pexels.com/photos/4443344/pexels-photo-4443344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    category: 'Women'
  },
  {
    id: 3,
    name: 'Slim Fit Denim',
    price: 89.99,
    image: 'https://images.pexels.com/photos/4210863/pexels-photo-4210863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    category: 'Men'
  },
  {
    id: 4,
    name: 'Structured Handbag',
    price: 159.99,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    category: 'Accessories'
  }
];

const NewArrivalsSection = () => {
  return (
    <section className="py-16">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-serif font-bold text-gray-900">New Arrivals</h2>
          <p className="mt-2 text-gray-600">
            The latest additions to our collections
          </p>
        </div>
        <a href="#" className="text-gray-900 font-medium hover:underline hidden sm:block">
          View All
        </a>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="relative overflow-hidden rounded-lg mb-3">
              <div 
                className="aspect-w-3 aspect-h-4 bg-gray-200 rounded-lg overflow-hidden"
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-gray-900 py-2 px-4 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium shadow-md hover:bg-gray-100">
                Add to Cart
              </button>
            </div>
            <div>
              <p className="text-sm text-gray-500">{product.category}</p>
              <h3 className="font-medium text-gray-900 mt-1">{product.name}</h3>
              <p className="font-medium text-gray-900 mt-1">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center sm:hidden">
        <a href="#" className="text-gray-900 font-medium hover:underline">
          View All Products
        </a>
      </div>
    </section>
  );
};

export default NewArrivalsSection;