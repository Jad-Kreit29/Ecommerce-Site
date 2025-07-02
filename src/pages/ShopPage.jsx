import React, { useState, useEffect, useMemo } from 'react';
import { X } from 'lucide-react';
import { productsData } from '../data/products';
import Button from '../components/ui/Button';
import Checkbox from '../components/ui/Checkbox';
import ProductList from '../components/ProductList';
import { Label } from '../components/ui/Label';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const filteredProducts = useMemo(() => {
    let currentProducts = [...products];

    Object.keys(selectedFilters).forEach(filterCategory => {
      const selectedOptions = selectedFilters[filterCategory];

      if (selectedOptions && selectedOptions.length > 0) {
        currentProducts = currentProducts.filter(product => {
          const productValue = product[filterCategory];

          if (Array.isArray(productValue)) {
            return selectedOptions.some(option => productValue.includes(option));
          }
          return selectedOptions.includes(productValue);
        });
      }
    });
    return currentProducts;
  }, [products, selectedFilters]);

  const handleFilterChange = (category, value) => {
    setSelectedFilters(prevFilters => {
      const currentCategoryFilters = prevFilters[category] || [];
      let newCategoryFilters;

      if (currentCategoryFilters.includes(value)) {
        newCategoryFilters = currentCategoryFilters.filter(item => item !== value);
      } else {
        newCategoryFilters = [...currentCategoryFilters, value];
      }

      if (newCategoryFilters.length === 0) {
        const { [category]: removed, ...rest } = prevFilters;
        return rest;
      }

      return {
        ...prevFilters,
        [category]: newCategoryFilters,
      };
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
  };

  const getUniqueOptions = (category) => {
    if (!products.length) return [];
    const options = new Set();
    products.forEach(product => {
      const value = product[category];
      if (value) {
        if (Array.isArray(value)) {
          value.forEach(item => options.add(item));
        } else {
          options.add(value);
        }
      }
    });
    return Array.from(options).sort();
  };

  const filterCategories = {
    'Animal Type': 'animalType',
    'Animal Sub-Type': 'animalSubType',
    'Chocolate Type': 'chocolateType',
    'Dietary Needs': 'dietary',
    'Flavor Profile': 'flavor',
    'Occasion': 'occasion',
    'Size': 'size',
    'Packaging': 'packaging',
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-orange-900 mb-8">Our Chocolate Animals</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Panel */}
        <div className="md:w-1/4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-orange-800 mb-6">Filter By</h2>

          {Object.keys(selectedFilters).length > 0 && (
            <div className="mb-6 pb-4 border-b border-dashed border-gray-200">
              <h3 className="text-lg font-medium text-amber-700 mb-3">Applied Filters</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {Object.entries(selectedFilters).map(([category, values]) =>
                  values.map(value => (
                    <span
                      key={`${category}-${value}`}
                      className="bg-orange-700 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 cursor-pointer hover:bg-orange-800 transition-colors"
                      onClick={() => handleFilterChange(category, value)}
                    >
                      {value}
                      <X size={16} /> {/* X icon to remove filter */}
                    </span>
                  ))
                )}
              </div>
              <Button
                onClick={handleClearFilters}
                variant="outline"
                className="w-full text-orange-700 border-orange-700 hover:bg-orange-50"
              >
                Clear All Filters
              </Button>
            </div>
          )}

          {Object.entries(filterCategories).map(([displayName, propertyName]) => (
            <div key={propertyName} className="mb-6 pb-4 border-b border-dashed border-gray-200 last:border-b-0">
              <h3 className="text-lg font-medium text-amber-700 mb-3">{displayName}</h3>
              <div className="flex flex-col gap-2">
                {getUniqueOptions(propertyName).map(option => (
                  <div key={option} className="flex items-center space-x-2"> {/* Wrapper for Checkbox and Label */}
                    <Checkbox
                      id={`${propertyName}-${option}`}
                      checked={selectedFilters[propertyName]?.includes(option) || false}
                      onCheckedChange={() => handleFilterChange(propertyName, option)}
                    />
                    {/* Explicitly setting text-gray-800 to ensure visibility */}
                    <Label htmlFor={`${propertyName}-${option}`} className="text-gray-800">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Product List */}
        <div className="md:w-3/4">
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;