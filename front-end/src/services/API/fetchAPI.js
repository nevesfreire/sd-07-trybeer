const fetchApi = (endpoint, body = {}) => fetch(`http://localhost:3001${endpoint}`, body);

export default fetchApi;
