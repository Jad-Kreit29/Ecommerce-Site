import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Home, Store } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const totalItemsInCart = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-gradient-to-r from-orange-800 to-amber-700 text-white p-4 shadow-md sticky top-0 z-50 rounded-b-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <img src="https://placehold.co/30x30/FFFFFF/000000?text=🍫" alt="Chocolate Icon" className="rounded-full" />
          ChocoZoo
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-amber-200 transition-colors flex items-center gap-1">
            <Home size={18} /> Home
          </Link>
          <Link to="/shop" className="hover:text-amber-200 transition-colors flex items-center gap-1">
            <Store size={18} /> Shop
          </Link>
          <Link to="/cart" className="relative hover:text-amber-200 transition-colors flex items-center gap-1">
            <ShoppingCart size={20} /> Cart
            {totalItemsInCart > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItemsInCart}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;