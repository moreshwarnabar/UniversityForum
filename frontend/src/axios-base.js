import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/forum/',
});

instance.interceptors.request.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (!error.response) return Promise.reject(error);
    return Promise.reject(error);
  }
);

export default instance;
