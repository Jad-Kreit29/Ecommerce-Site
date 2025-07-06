import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'

import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import ReviewOrderPage from './pages/ReviewOrderPage'
import SurveyPage from './pages/SurveyPage'
import Stepper from './components/Stepper'

const App = () => {
  // useLocation is correctly used here because App is now wrapped by Router in index.jsx
  const location = useLocation(); 
  const currentPath = location.pathname;

  // Define the steps for the custom stepper
  const checkoutSteps = ['Shop', 'Cart', 'Checkout', 'Review Order'];

  // Determine if the stepper should be visible on the current page
  // It should NOT be shown on the Home page ('/') or the Survey page ('/survey')
  const showStepper = currentPath !== '/' && currentPath !== '/survey';

  return (
    <CartProvider>
      <Navbar />

      {/* Render the custom Stepper conditionally */}
      {showStepper && (
        <Stepper steps={checkoutSteps} />
      )}

      <main className="min-h-[calc(100vh-80px)]"> {/* Adjust height based on navbar */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/review-order" element={<ReviewOrderPage />} />
          <Route path="/survey" element={<SurveyPage />} />
          {/* Add other routes here, e.g., for product details */}
        </Routes>
      </main>
    </CartProvider>
  );
};

export default App;
