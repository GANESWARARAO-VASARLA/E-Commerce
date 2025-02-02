import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchProducts } from '../services/apiService'; // Assuming this is the service to fetch products

const ProductContext = createContext();

export const useProducts = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Return empty array on error
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) => product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ProductContext.Provider value={{ products: filteredProducts, searchQuery, setSearchQuery, loading }}>
      {children}
    </ProductContext.Provider>
  );
};
