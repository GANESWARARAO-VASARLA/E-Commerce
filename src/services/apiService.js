import axios from 'axios';

export const fetchProducts = async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axios.get('https://fakestoreapi.com/products/categories');
  return response.data;
};
