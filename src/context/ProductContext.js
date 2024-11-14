// src/context/ProductContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the context
const ProductContext = createContext();

// Create a provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  // You can add other shared states or functions here
  
  return (
    <ProductContext.Provider value={{ products, setProducts, searchTerm, setSearchTerm, filteredProducts, setFilteredProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the product context
export const useProducts = () => {
  return useContext(ProductContext);
};
