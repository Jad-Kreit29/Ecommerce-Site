// src/pages/CartPage.jsx

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/ui/button';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  // Calculate total cart value, considering sale prices
  const totalCartValue = cartItems.reduce((sum, item) => {
    // If the item is on sale, use its salePrice for calculation, otherwise use its regular price
    const priceToUse = item.isOnSale && item.salePrice !== undefined ? item.salePrice : item.price;
    return sum + priceToUse * item.quantity;
  }, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-orange-900 mb-8">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-lg text-gray-600 mt-10 p-8 bg-white rounded-lg shadow-md">
          <p className="mb-4">Your cart is empty. Time to add some delicious chocolate animals!</p>
          <Link to="/shop">
            <Button className="bg-amber-700 hover:bg-amber-800 text-white">Go to Shop</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => {
              // Determine the price to display for each item
              const priceToDisplay = item.isOnSale && item.salePrice !== undefined ? item.salePrice : item.price;
              return (
                <li key={item.id} className="flex items-center py-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md mr-4"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/80x80/CCCCCC/333333?text=🍫`; }}
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-orange-900">{item.name}</h3>
                    <p className="text-gray-600">
                      {item.isOnSale && item.salePrice !== undefined ? (
                        <>
                          <span className="line-through mr-1">${item.price.toFixed(2)}</span>
                          <span className="text-red-600 font-bold">${item.salePrice.toFixed(2)}</span> each
                        </>
                      ) : (
                        `$${item.price.toFixed(2)} each`
                      )}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-orange-700 hover:bg-orange-50"
                      >
                        -
                      </Button>
                      <span className="px-3 text-lg font-medium">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-orange-700 hover:bg-orange-50"
                      >
                        +
                      </Button>
                    </div>
                    <p className="text-xl font-bold text-amber-700 w-24 text-right">
                      ${(priceToDisplay * item.quantity).toFixed(2)}
                    </p>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      Remove
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-end items-center border-t border-gray-200 pt-6 mt-6">
            <h2 className="text-2xl font-bold text-orange-900 mr-4">Total:</h2>
            <span className="text-3xl font-extrabold text-amber-700">${totalCartValue.toFixed(2)}</span>
          </div>
          <div className="flex justify-end mt-6">
            <Button
              onClick={() => navigate('/checkout')}
              className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3 rounded-md"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
