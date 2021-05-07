const fetchApi = async (endpoint, method, body, token = '') => {
  const requestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(body),
  };
  console.log('requestOptions', requestOptions);
  const request = await fetch(`http://localhost:3001${endpoint}`, requestOptions);
  const response = await request.json();
  console.log('response fetchAPI', response);
  return response;
};

export default fetchApi;
