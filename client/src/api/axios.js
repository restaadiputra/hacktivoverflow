import axios from 'axios';

export default axios.create({
  baseURL: 'http://overflowserver.restadev.com/'
  // baseURL: 'http://localhost:3000',
});
