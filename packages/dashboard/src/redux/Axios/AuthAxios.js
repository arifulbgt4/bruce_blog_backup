import axios from 'axios';

// Set config defaults when creating the instance
const AuthAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default AuthAxios;
