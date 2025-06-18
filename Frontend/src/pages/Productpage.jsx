import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductContext } from "../context/productContext"; // Adjust the path as needed
import "./Product.css";

const Product = ({ addToCart }) => {
  const { id } = useParams();
  const { products, loading, error } = useContext(ProductContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading product: {error.message}</div>;

  const product = products.find((p) => p.id === id);

  if (!product) return <div>Product not found.</div>;

  const handleBuyNow = () => {
    addToCart(product);
    window.location.href = "/checkout";
  };

  return (
    <div className="product-container">
      <img src={product.url} alt={product.name} className="product-image" />
      <div className="product-details">
        <h2>{product.name}</h2>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <div className="product-actions">
          <Link to="/cart">
            <button onClick={() => addToCart(product)} className="add-cart-btn">
              Add to Cart
            </button>
          </Link>
          <button onClick={handleBuyNow} className="buy-btn">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
