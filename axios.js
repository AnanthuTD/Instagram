// axios-config.js
import axios from 'axios';

export default axios.create({
  headers: {
    'ngrok-skip-browser-warning': '69420',
  },
});

