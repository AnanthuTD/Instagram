// axios-config.js
import axios from 'axios';
import { fetchCSRF } from './utils/fetch_csrf';

const axiosInstance = axios.create({
  headers: {
    'ngrok-skip-browser-warning': '69420',
  },
});

axiosInstance.interceptors.request.use(async function (config) {
  const csrfToken = await fetchCSRF();
  config.headers['X-CSRFToken'] = csrfToken;
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default axiosInstance;