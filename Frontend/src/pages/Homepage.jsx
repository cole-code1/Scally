import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/productContext"; // import context
import "./Homepage.css";
import clothe from "../assets/clothe.png";

const HomePage = () => {
  const { products, loading, error } = useContext(ProductContext);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="homepage-container">
      {/* Banner */}
      <div className="banner">
        <img src={clothe} alt="Fashion Banner" className="banner-image" />
        <div className="banner-text">
          <h1>Isiah 50:3</h1>
          <p>I clothe the heavens with darkness and make sackcloth its covering.</p>
        </div>
      </div>

      {/* Products */}
      <div className="product-grid">
        {products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-link">
            <div className="product-card">
              <img
                src={product.url}
                alt={product.name}
                className="product-image"
              />
              <h2 className="product-name">{product.name}</h2>
              {!product.soldOut ? (
                <p className="product-price">{product.price}</p>
              ) : (
                <button className="sold-out-btn">Sold out</button>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
