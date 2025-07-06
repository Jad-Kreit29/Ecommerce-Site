import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingCart, Home, Store } from 'lucide-react'
import { CartContext } from '../context/CartContext'
import Logo from '../assets/logo.svg'

const Navbar = () => {

  // Updates the number of items within the cart!
  const { cartItems } = useContext(CartContext);
  const totalItemsInCart = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Sets the active status of what page we are on
  const activeState = ({ isActive }) => isActive ? 'text-amber-200 font-bold hover:text-amber-400 transition-colors flex items-center gap-1' : 'font-bold hover:text-amber-200 transition-colors flex items-center gap-1'

  return (
    <nav className="bg-gradient-to-r from-orange-800 to-amber-700 text-white p-4 shadow-md sticky top-0 z-50 rounded-b-lg">

      <div className="container mx-auto flex justify-between items-center">

        {/* Site Logo */}
        <NavLink to="/" className="text-2xl font-bold tracking-tight flex items-center gap-3">
          <img src={Logo} alt="Chocolate Icon" className="w-20 h-20 bg-white p-1.5 rounded-full" />
          ChocoZoo
        </NavLink>

        <div className="flex items-center space-x-6">

          {/* Home Page */}
          <NavLink to="/" className={activeState}>
            <Home size={18} /> Home
          </NavLink>

          {/* Shop Page */}
          <NavLink to="/shop" className={activeState}>
            <Store size={18} /> Shop
          </NavLink>

          {/* Cart Page */}
          <NavLink to="/cart" className={`relative ${activeState} bg-amber-950 p-3 rounded-2xl`}>

            <ShoppingCart size={20} /> Cart
            {totalItemsInCart > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItemsInCart}
              </span>
            )}
            
          </NavLink>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;