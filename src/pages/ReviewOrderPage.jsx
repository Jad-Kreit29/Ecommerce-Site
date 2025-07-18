// src/pages/ReviewOrderPage.jsx

import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { CartContext } from '../context/CartContext';
import OrderConfirmationModal from '../components/OrderConfirmationModal';

const ReviewOrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCartItems } = useContext(CartContext);

  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Retrieve order details passed from CheckoutPage
  const { cartItems, shippingInfo, paymentMethod, creditCardInfo } = location.state || {};

  // Redirect if no order details are found (e.g., direct access to this URL)
  if (!cartItems || cartItems.length === 0 || !shippingInfo) {
    navigate('/cart'); // Redirect to cart if no order details
    return null;
  }

  // Calculate total cart value for review, considering sale prices
  const totalCartValue = cartItems.reduce((sum, item) => {
    // If the item is on sale, use its salePrice for calculation, otherwise use its regular price
    const priceToUse = item.isOnSale && item.salePrice !== undefined ? item.salePrice : item.price;
    return sum + priceToUse * item.quantity;
  }, 0);

  const handleConfirmOrder = () => {
    // In a real application, this is where you'd send the final order to the backend.
    console.log('Final Order Confirmed:', {
      shippingInfo,
      paymentMethod,
      creditCardInfo: paymentMethod === 'creditCard' ? creditCardInfo : null,
      cartItems,
      totalCartValue,
    });

    // Clear the cart after successful order
    setCartItems([]);
    setIsModalOpen(true); // Open the custom modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
    navigate('/survey'); // Redirect to survey page after modal is closed
  };

  return (
    <div className="container mx-auto p-4">

      <h1 className="text-4xl font-bold text-center text-orange-900 mb-8">Review Your Order</h1>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* Order Summary */}
        <Card className="flex-1 p-6 shadow-lg rounded-lg">

          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-orange-800">Order Details</CardTitle>
          </CardHeader>

          <CardContent>
            <h3 className="text-xl font-semibold text-amber-700 mb-4">Items:</h3>
            <ul className="divide-y divide-gray-200 mb-4">
              {cartItems.map((item) => {

                // Calculate the original total price for the quantity
                const originalItemTotalPrice = item.price * item.quantity;
                // Calculate the price to display (sale price if applicable, otherwise original price)
                const priceToDisplay = item.isOnSale && item.salePrice !== undefined ? item.salePrice : item.price;
                // Calculate the total price based on the price to display
                const currentItemTotalPrice = priceToDisplay * item.quantity;

                return (
                  <li key={item.id} className="flex justify-between items-center py-2">
                    <span className="text-gray-800">{item.name} (x{item.quantity})</span>
                    <span className="font-medium">
                      {item.isOnSale && item.salePrice !== undefined ? (
                        <>
                          {/* Display original total price crossed out */}
                          <span className="line-through mr-1 text-gray-500">${originalItemTotalPrice.toFixed(2)}</span>
                          {/* Display current total price (sale price * quantity) */}
                          <span className="text-red-600 font-bold">${currentItemTotalPrice.toFixed(2)}</span>
                        </>
                      ) : (
                        // Display regular total price if not on sale
                        `$${currentItemTotalPrice.toFixed(2)}`
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="flex justify-between font-bold text-xl text-orange-900 border-t pt-3 mt-3">
              <span>Total:</span>
              <span>${totalCartValue.toFixed(2)} CAD</span>
            </div>
            
          </CardContent>
        </Card>

        {/* Shipping & Payment Information */}
        <div className="flex-1 flex flex-col gap-8">

          <Card className="p-6 shadow-lg rounded-lg">

            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-orange-800">Shipping Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 text-gray-700">
              <p><strong>Name:</strong> {shippingInfo.fullName}</p>
              <p><strong>Address:</strong> {shippingInfo.address}</p>
              <p><strong>City:</strong> {shippingInfo.city}</p>
              <p><strong>Province:</strong> {shippingInfo.province}</p>
              <p><strong>Postal Code:</strong> {shippingInfo.postalCode}</p>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-lg rounded-lg">

            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-orange-800">Payment Method</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 text-gray-700">
              <p><strong>Method:</strong> {paymentMethod === 'creditCard' ? 'Credit/Debit Card' : paymentMethod === 'interac' ? 'Interac e-Transfer' : paymentMethod === 'applePay' ? 'Apple Pay' : 'Google Pay'}</p>
              {paymentMethod === 'creditCard' && (
                <>
                  <p><strong>Card Number:</strong> **** **** **** {creditCardInfo.cardNumber.slice(-4)}</p>
                  <p><strong>Expiry:</strong> {creditCardInfo.expiryDate}</p>
                </>
              )}
            </CardContent>
          </Card>

          <CardFooter className="mt-3">
            <Button
              onClick={handleConfirmOrder}
              className="w-full bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3 rounded-md"
            >
              Confirm Order
            </Button>
          </CardFooter>
        </div>
      </div>

      {/* Render the custom confirmation modal */}
      <OrderConfirmationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        message="Your order has been placed successfully!"
      />
    </div>
  );
};

export default ReviewOrderPage;
