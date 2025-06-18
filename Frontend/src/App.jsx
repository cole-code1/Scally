import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import Navbar from './components/Navbar';
import Cartitem from './pages/CartItempage';
import Product from './pages/Productpage';
import { ProductProvider } from "./context/productContext";

function App() {
  return (
    <ProductProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cartitem />} />
        
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </ProductProvider>
  );
}

export default App;
