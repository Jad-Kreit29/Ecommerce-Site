import React, { useContext } from 'react'
import { Button } from '@/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/ui/card'
import { CartContext } from '../context/CartContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <Card className="flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <CardHeader className="p-0">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/300x200/CCCCCC/333333?text=Image+Not+Found`; }}
        />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-semibold text-orange-900 mb-2">{product.name}</CardTitle>
        <CardDescription className="text-gray-600 mb-3">
          Type: {product.chocolateType} | Size: {product.size}
        </CardDescription>
        <p className="text-2xl font-bold text-amber-700">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
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