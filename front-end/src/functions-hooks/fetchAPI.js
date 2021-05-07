import errorHandling from './errorHandling';

const fecheAPI = async (route, method, iten) => {
  const response = await fetch(`http://localhost:3001${route}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(iten),
  });
  const obj = await response.json();
  // const transformation = errorHandling(obj);
  return obj;
}

export default { fecheAPI };
