import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import Navbar from './components/Navbar';

import Cartitem from './pages/CartItempage';
import { ProductProvider } from "./context/productContext";

function App() {
  return (
    <ProductProvider>
      <Navbar />
      {/* Added top padding to account for fixed navbar height */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cartitem />} />
        {/* Add other routes here */}
      </Routes>
    </ProductProvider>
  );
}

export default App;
