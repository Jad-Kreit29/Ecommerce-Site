import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Home, Store, X } from 'lucide-react'; // Icons from lucide-react

import { CartProvider } from './context/CartContext'; // Assuming CartContext.jsx is in src/context/
import Navbar from './components/Navbar';           // Assuming Navbar.jsx is in src/components/
import HomePage from './pages/HomePage';             // Assuming HomePage.jsx is in src/pages/
import ShopPage from './pages/ShopPage';             // Assuming ShopPage.jsx is in src/pages/
import CartPage from './pages/CartPage';             // Assuming CartPage.jsx is in src/pages/
import CheckoutPage from './pages/CheckoutPage';     // Import the CheckoutPage
import ReviewOrderPage from './pages/ReviewOrderPage'; // Import the new ReviewOrderPage

const App = () => {
  return (
    <Router>
      <CartProvider>
        <Navbar />
        <main className="min-h-[calc(100vh-80px)]"> {/* Adjust height based on navbar */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/review-order" element={<ReviewOrderPage />} /> {/* New Review Order Route */}
            {/* Add other routes here, e.g., for product details */}
          </Routes>
        </main>
      </CartProvider>
    </Router>
  );
};

export default App;
