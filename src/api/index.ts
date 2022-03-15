import axios from 'axios';
import { API_URL } from '../config';

const API = axios.create(
  {
    baseURL: API_URL.endsWith("/") ? API_URL : `${API_URL}/`,
    responseType: 'json',
  }
)

export default API;
