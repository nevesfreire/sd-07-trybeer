const fetchApi = async (endpoint, method, body, token = '') => {
  const requestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      authorization: token,
    },
    body: JSON.stringify(body),
  };
  const request = await fetch(`http://localhost:3001${endpoint}`, requestOptions);
  const response = await request.json();
  return response;
};

export default fetchApi;
