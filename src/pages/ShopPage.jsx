// src/pages/ShopPage.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { X, Search } from 'lucide-react';
import { productsData } from '../data/products';
import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import ProductList from '../components/ProductList';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const filteredProducts = useMemo(() => {
    let currentProducts = [...products];

    // Filter by search term first
    if (searchTerm) {
      currentProducts = currentProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Then apply category filters
    Object.keys(selectedFilters).forEach(filterCategory => {
      const selectedOptions = selectedFilters[filterCategory];

      if (selectedOptions && selectedOptions.length > 0) {
        currentProducts = currentProducts.filter(product => {
          // Special handling for 'isOnSale' filter
          if (filterCategory === 'isOnSale') {
            // If 'On Sale' is selected, only show products where isOnSale is true
            return selectedOptions.includes('On Sale') ? product.isOnSale : true;
          }

          const productValue = product[filterCategory];

          if (Array.isArray(productValue)) {
            return selectedOptions.some(option => productValue.includes(option));
          }
          return selectedOptions.includes(productValue);
        });
      }
    });
    return currentProducts;
  }, [products, selectedFilters, searchTerm]);

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
    // Special handling for 'isOnSale' category: it only has one option "On Sale"
    if (category === 'isOnSale') {
      return ['On Sale'];
    }

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
    'Size': 'size',
    'Sale Items': 'isOnSale'
  };

  return (
    <div className="container mx-auto p-4">

      <h1 className="text-4xl font-bold text-center text-orange-900 mb-4">Our Chocolate Animals</h1>
      <p className='text-lg text-center mb-4'>Browse our collection of cute chocolate animals to match your personality!</p>
      <p className='text-lg text-center mb-8 bg-red-50 p-4 rounded-lg'>Your favorites just got <span className='text-red-500 font-bold'>20% sweeter</span> — enjoy our limited-time <span className='text-red-500 font-bold'>SUMMER SALE</span> before it’s gone!</p>

      {/* Split columns between filter section and product listings */}
      <div className="flex flex-col md:flex-row gap-8">

        {/* Filter Panel */}
        <div className="md:w-1/4 bg-white p-6 rounded-lg shadow-md h-fit top-24"> {/* Added h-fit and sticky for better filter panel display */}
          <h2 className="text-2xl font-semibold text-orange-800 mb-6">Filter By</h2>

          {/* Search Bar */}
          <div className="mb-6 pb-4 border-b border-dashed border-gray-200">
            <h3 className="text-lg font-medium text-amber-700 mb-3">Search Products</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Applied Filters Display and Clear Button */}
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
                      <X size={16} />
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

          {/* Displaying filter categories */}
          {Object.entries(filterCategories).map(([displayName, propertyName]) => (
            <div key={propertyName} className="mb-6 pb-4 border-b border-dashed border-gray-200 last:border-b-0">
              <h3 className="text-lg font-medium text-amber-700 mb-3">{displayName}</h3>
              <div className="flex flex-col gap-2">
                {getUniqueOptions(propertyName).map(option => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${propertyName}-${option}`}
                      checked={selectedFilters[propertyName]?.includes(option) || false}
                      onCheckedChange={() => handleFilterChange(propertyName, option)}
                    />
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
