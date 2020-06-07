import axios from 'axios';
import { IS_LOCAL } from '../utils/config';

// TEST API HOST
export const HOST = 'http://192.168.88.249:3000';

export const API_HOST = IS_LOCAL
	? // ? 'http://localhost:4000/api'
	  `http://192.168.88.249:4000/api`
	: window.location.protocol + '//' + window.location.host + '/api';

const instance = axios.create({
	baseURL: API_HOST,
});

export default instance;
