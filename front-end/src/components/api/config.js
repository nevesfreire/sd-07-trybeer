import axios from 'axios';

axios.defaults.withCredentials = true;

// process.env.REACT_APP_API_BASE_URL;

axios.defaults.baseURL = 'localhost:3000'

export default axios;
