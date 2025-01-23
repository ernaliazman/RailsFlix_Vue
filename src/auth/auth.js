// authService.js
import axios from 'axios';

const TOKEN_KEY = 'authToken'; 

// Set the Authorization header globally for all axios requests
const setAuthHeader = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Store the token in localStorage
const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
  setAuthHeader();  // Update axios header after saving the token
};

// Retrieve the token from localStorage
const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Remove the token from localStorage
const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  setAuthHeader();  // Update axios header after removing the token
};

export default {
  saveToken,
  getToken,
  removeToken,
  setAuthHeader,
};
