import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../components/ui/Card';
import { CartContext } from '../context/CartContext';

const ReviewOrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCartItems } = useContext(CartContext); // Assuming setCartItems is available for clearing cart

  // Retrieve order details passed from CheckoutPage
  const { cartItems, shippingInfo, paymentMethod, creditCardInfo, totalCartValue } = location.state || {};

  // Redirect if no order details are found (e.g., direct access to this URL)
  if (!cartItems || cartItems.length === 0 || !shippingInfo) {
    navigate('/cart'); // Redirect to cart if no order details
    return null;
  }

  const handleConfirmOrder = () => {
    // In a real application, this is where you'd send the final order to the backend.
    console.log('Final Order Confirmed:', {
      shippingInfo,
      paymentMethod,
      creditCardInfo: paymentMethod === 'creditCard' ? creditCardInfo : null,
      cartItems,
      totalCartValue,
    });

    // Simulate order success and clear cart
    alert('Order Placed Successfully! Thank you for your purchase.');
    setCartItems([]); // Clear the cart after successful order
    navigate('/'); // Redirect to home page or an order confirmation page
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-orange-900 mb-8">Review Your Order</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Order Summary */}
        <Card className="flex-1 p-6 shadow-lg rounded-lg">
          <CardHeader className="mb-6">
            <CardTitle className="text-2xl font-semibold text-orange-800">Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold text-amber-700 mb-4">Items:</h3>
            <ul className="divide-y divide-gray-200 mb-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center py-2">
                  <span className="text-gray-800">{item.name} (x{item.quantity})</span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
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
            <CardHeader className="mb-6">
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
            <CardHeader className="mb-6">
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

          <CardFooter className="mt-6">
            <Button
              onClick={handleConfirmOrder}
              className="w-full bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3 rounded-md"
            >
              Confirm Order
            </Button>
          </CardFooter>
        </div>
      </div>
    </div>
  );
};

export default ReviewOrderPage;
