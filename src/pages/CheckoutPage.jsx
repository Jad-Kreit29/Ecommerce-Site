// src/pages/CheckoutPage.jsx

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Button from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

const CheckoutPage = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // Calculate total cart value, considering sale prices
  const totalCartValue = cartItems.reduce((sum, item) => {
    // If the item is on sale, use its salePrice for calculation, otherwise use its regular price
    const priceToUse = item.isOnSale && item.salePrice !== undefined ? item.salePrice : item.price;
    return sum + priceToUse * item.quantity;
  }, 0);

  // State for shipping information
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
  });

  // State for payment method
  const [paymentMethod, setPaymentMethod] = useState('creditCard'); // Default to credit card
  const [creditCardInfo, setCreditCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleCreditCardChange = (e) => {
    const { name, value } = e.target;
    setCreditCardInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleProceedToReview = (e) => {
    e.preventDefault();
    // Pass all order details to the review page via state
    navigate('/review-order', {
      state: {
        cartItems,
        shippingInfo,
        paymentMethod,
        creditCardInfo,
        totalCartValue, // Ensure the correct totalCartValue is passed
      },
    });
  };

  return (
    
    <div className="container mx-auto p-4">

      <h1 className="text-4xl font-bold text-center text-orange-900 mb-8">Checkout</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-lg text-gray-600 mt-10 p-8 bg-white rounded-lg shadow-md">
          <p className="mb-4">Your cart is empty. Please add items before checking out.</p>
          <Button onClick={() => navigate('/shop')} className="bg-amber-700 hover:bg-amber-800 text-white">
            Go to Shop
          </Button>
        </div>
      ) : (
        <form onSubmit={handleProceedToReview}>

          <div className='flex flex-col lg:flex-row gap-8'>

            {/* Shipping Information */}
            <Card className="h-115 flex-1 p-6 rounded-lg">

              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-orange-800">Shipping Information</CardTitle>
              </CardHeader>

              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={shippingInfo.fullName}
                    onChange={handleShippingChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleShippingChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                  <select
                    id="province"
                    name="province"
                    value={shippingInfo.province}
                    onChange={handleShippingChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    required
                  >
                    <option value="">Select Province</option>
                    <option value="AB">Alberta</option>
                    <option value="BC">British Columbia</option>
                    <option value="MB">Manitoba</option>
                    <option value="NB">New Brunswick</option>
                    <option value="NL">Newfoundland and Labrador</option>
                    <option value="NS">Nova Scotia</option>
                    <option value="ON">Ontario</option>
                    <option value="PE">Prince Edward Island</option>
                    <option value="QC">Quebec</option>
                    <option value="SK">Saskatchewan</option>
                    <option value="NT">Northwest Territories</option>
                    <option value="NU">Nunavut</option>
                    <option value="YT">Yukon</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={shippingInfo.postalCode}
                    onChange={handleShippingChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    pattern="[A-Za-z][0-9][A-Za-z]\s?[0-9][A-Za-z][0-9]" // Corrected Canadian postal code pattern
                    title="Enter a valid Canadian postal code (e.g., A1A 1A1 or A1A1A1)"
                    required
                  />
                </div>

              </CardContent>
            </Card>

            {/* Payment Method */}
            <div className="flex-1 flex flex-col gap-8">

              <Card className="h-115 p-6 rounded-lg">

                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-orange-800">Payment Method</CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="creditCard"
                        name="paymentMethod"
                        value="creditCard"
                        checked={paymentMethod === 'creditCard'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 text-amber-600 border-gray-300 focus:ring-amber-500"
                      />

                      <label htmlFor="creditCard" className="ml-3 block text-base font-medium text-gray-800">Credit/Debit Card</label>

                    </div>
                    {paymentMethod === 'creditCard' && (
                      <div className="grid grid-cols-1 gap-4 pl-6">
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={creditCardInfo.cardNumber}
                            onChange={handleCreditCardChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                            placeholder="XXXX XXXX XXXX XXXX"
                            required={paymentMethod === 'creditCard'}
                          />
                        </div>

                        <div className="flex gap-4">
                          <div className="flex-1">
                            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry (MM/YY)</label>
                            <input
                              type="text"
                              id="expiryDate"
                              name="expiryDate"
                              value={creditCardInfo.expiryDate}
                              onChange={handleCreditCardChange}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                              placeholder="MM/YY"
                              required={paymentMethod === 'creditCard'}
                            />
                          </div>

                          <div className="flex-1">
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={creditCardInfo.cvv}
                              onChange={handleCreditCardChange}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                              placeholder="XXX"
                              required={paymentMethod === 'creditCard'}
                            />
                          </div>

                        </div>
                      </div>
                    )}

                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="interac"
                        name="paymentMethod"
                        value="interac"
                        checked={paymentMethod === 'interac'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 text-amber-600 border-gray-300 focus:ring-amber-500"
                      />
                      <label htmlFor="interac" className="ml-3 block text-base font-medium text-gray-800">Interac e-Transfer</label>
                    </div>
                    {paymentMethod === 'interac' && (
                      <div className="pl-6 text-gray-700 text-sm">
                        <p>Instructions for Interac e-Transfer will be sent to your email after placing the order.</p>
                        <p className="font-semibold">Please ensure your email is correct in the shipping info.</p>
                      </div>
                    )}

                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="applePay"
                        name="paymentMethod"
                        value="applePay"
                        checked={paymentMethod === 'applePay'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 text-amber-600 border-gray-300 focus:ring-amber-500"
                      />
                      <label htmlFor="applePay" className="ml-3 block text-base font-medium text-gray-800">Apple Pay</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="googlePay"
                        name="paymentMethod"
                        value="googlePay"
                        checked={paymentMethod === 'googlePay'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 text-amber-600 border-gray-300 focus:ring-amber-500"
                      />
                      <label htmlFor="googlePay" className="ml-3 block text-base font-medium text-gray-800">Google Pay</label>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
            </div>

          </div>

          {/* Order Summary */}
          <div className='mt-8'>

            <Card className="p-6 shadow-lg rounded-lg">

              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-orange-800">Order Summary</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                  <span>${totalCartValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>Free</span> {/* For simplicity, assuming free shipping */}
                </div>
                <div className="flex justify-between font-bold text-xl text-orange-900 border-t pt-3 mt-3">
                  <span>Total</span>
                  <span>${totalCartValue.toFixed(2)} CAD</span>
                </div>
              </CardContent>
              <CardFooter className="mt-6">
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3 rounded-md">
                  Proceed to Review
                </Button>
              </CardFooter>
            </Card>

          </div>

        </form>
      )}

    </div>

  );
};

export default CheckoutPage;
