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

const saveUserId = (id) => {
  localStorage.setItem('userId', id);
};
const saveUserName = (name) => {
  localStorage.setItem('userName', name);
};

const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
  setAuthHeader();  
};


const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const getUserId = () => {
  return localStorage.getItem('userId');
};
const getUserName = () => {
  return localStorage.getItem('userName');
};


const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  setAuthHeader();  // Update axios header after removing the token
};

export default {
  saveUserId,
  saveUserName,
  saveToken,
  getUserName,
  getUserId,
  getToken,
  removeToken,
  setAuthHeader,
};
