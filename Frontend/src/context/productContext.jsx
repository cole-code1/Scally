import React, { createContext, useState, useEffect, useCallback } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Track if component is mounted
    
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/products");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        
        if (isMounted) {
          setProducts(data);
          setError(null); // Clear any previous errors on success
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        if (isMounted) {
          setError(err.message); // Store just the error message
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, []);

  // Memoized product lookup function
  const getProductById = useCallback((id) => {
    return products.find(product => product.id === id);
  }, [products]);

  const value = {
    products,
    loading,
    error,
    getProductById
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};