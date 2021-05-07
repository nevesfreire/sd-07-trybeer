import errorHandling from './errorHandling';

const fetchAPI = async (route, method, iten) => {
  const requestOptions = {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(iten),
  };
  const response = await fetch(`http://localhost:3001${route}`, requestOptions);
  const obj = await response.json();
  const transformation = errorHandling(obj);
  return transformation;
};

export default { fetchAPI };
