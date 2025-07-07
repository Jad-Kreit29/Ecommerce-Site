// src/components/ProductCard.jsx

import React, { useContext } from 'react';
import Button from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <Card className="relative flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      {/* Sale Badge */}
      {product.isOnSale && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">
          SALE!
        </span>
      )}

      {/* Title */}
      <CardHeader className="p-0">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/300x200/CCCCCC/333333?text=Image+Not+Found`; }}
        />
      </CardHeader>

      {/* Subtitle */}
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-semibold text-orange-900 mb-2">{product.name}</CardTitle>
        <CardDescription className="text-gray-600 mb-3">
          <span className='font-bold'>Type: </span> {product.chocolateType} | <span className='font-bold'>Size: </span> {product.size}
        </CardDescription>
        
        {/* Price Display */}
        <div className="flex items-baseline gap-2">
          {product.isOnSale ? (
            <>
              <span className="text-xl font-bold text-gray-500 line-through">${product.price.toFixed(2)}</span>
              <span className="text-2xl font-bold text-red-600">${product.salePrice.toFixed(2)}</span>
            </>
          ) : (
            <p className="text-2xl font-bold text-amber-700">${product.price.toFixed(2)}</p>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {/* Add to Cart Button */}
        <Button
          onClick={() => addToCart(product)}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
