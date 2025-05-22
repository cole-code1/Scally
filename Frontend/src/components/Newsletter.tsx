import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email) {
      // In a real application, you would handle the newsletter signup here
      setSubscribed(true);
      setEmail('');
    }
  };
  
  return (
    <section className="py-16 border-t border-gray-200">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-serif font-bold text-gray-900">Join Our Newsletter</h2>
        <p className="mt-2 text-gray-600">
          Subscribe to receive updates on new arrivals, special offers, and styling inspiration.
        </p>
        
        {subscribed ? (
          <div className="mt-6 p-4 bg-green-50 text-green-800 rounded-md">
            Thank you for subscribing! We've sent a confirmation to your email.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              By subscribing, you agree to our Privacy Policy and consent to receive our marketing emails.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;