import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  if (products.length === 0) {
    return (
      <p className="text-center text-lg text-gray-600 mt-10">
        No products found matching your filters. Try adjusting your selections!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;