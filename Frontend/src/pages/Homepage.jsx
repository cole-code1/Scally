import React from "react";
import "./Homepage.css"; // Make sure index.css is imported
import clothe from "../assets/clothe.png"; // Adjust the path as necessary
// Sample product data
const products = [
  {
    id: 1,
    name: "Patch custom pant",
    price: 2000,
    image: "/images/patch_pant.jpg",
    soldOut: false,
  },
  {
    id: 2,
    name: "Customized pant",
    price: 2000,
    image: "/images/custom_pant_1.jpg",
    soldOut: false,
  },
  {
    id: 3,
    name: "Customized pant",
    price: 1400,
    image: "/images/custom_pant_2.jpg",
    soldOut: false,
  },
  {
    id: 4,
    name: "Customized sweatshirt",
    price: 1200,
    image: "/images/sweatshirt.jpg",
    soldOut: false,
  },
  {
    id: 5,
    name: "Hoodie",
    price: 0,
    image: "/images/hoodie.jpg",
    soldOut: true,
  },
  {
    id: 6,
    name: "Layered pants",
    price: 1800,
    image: "/images/layered_pants.jpg",
    soldOut: false,
  },
];

const HomePage = () => {
  return (
    <div className="homepage-container">
      {/* Banner */}
      <div className="banner">
        <img
          src={clothe} // Replace with your actual banner image
          alt="Fashion Banner"
          className="banner-image"
        />
        <div className="banner-text">
          <h1>Isiah 50:3</h1>
          <p>I clothe the heavens with darkness and make sackcloth its covering.</p>
        </div>
      </div>

      {/* Products */}
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h2 className="product-name">{product.name}</h2>
            {!product.soldOut ? (
              <p className="product-price">KSh{product.price.toFixed(2)}</p>
            ) : (
              <button className="sold-out-btn">Sold out</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
