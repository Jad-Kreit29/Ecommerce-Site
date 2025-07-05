import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// IMPORTANT: Assuming 'awesome-react-stepper' is npm installed.
// Use the correct import based on the library's documentation:
import Stepper from 'awesome-react-stepper'; // Corrected component name and default import

import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ReviewOrderPage from './pages/ReviewOrderPage';
import SurveyPage from './pages/SurveyPage';

const App = () => {
  const location = useLocation(); 
  const currentPath = location.pathname;

  // Determine the active step based on the current path
  let activeStep = -1; // Default to -1 (no step active)

  if (currentPath === '/shop') {
    activeStep = 0;
  } else if (currentPath === '/cart') {
    activeStep = 1;
  } else if (currentPath === '/checkout') {
    activeStep = 2;
  } else if (currentPath === '/review-order') {
    activeStep = 3;
  }

  // Only show the stepper on relevant pages
  const showStepper = activeStep !== -1;

  // Log to help debug if the stepper is supposed to be shown
  console.log('Current Path:', currentPath);
  console.log('Active Step:', activeStep);
  console.log('Show Stepper:', showStepper);


  return (
    <CartProvider>
      <Navbar />

      {/* Render the Stepper conditionally */}
      {showStepper && (
        <div className="my-4 mx-auto max-w-4xl px-4"> {/* Wrapper div for margin and max-width */}
          <Stepper 
            activeStep={activeStep}
            backBtn={null}       // Set backBtn to null to hide the back button
            continueBtn={null}   // Set continueBtn to null to hide the continue button
            submitBtn={null}     // Ensure submit button is also hidden if it appears
            allowClickControl={false} // Disable clicking on the bar/steps for navigation
            
          >
            {/* These divs represent the individual steps for the stepper's visual display.
                The actual page content is handled by React Router's <Routes> below. */}
            <div>Shop</div> {/* Simple text for the step title */}
            <div>Cart</div>
            <div>Checkout</div>
            <div>Review Order</div>
          </Stepper>
        </div>
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
