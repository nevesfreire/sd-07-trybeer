import errorHandling from './errorHandling';

function fecheAPI(route, method, iten) {
  let transformation = {};
  fetch(`http://localhost:3001/${route}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(iten),
  })
    .then((response) => response.json())
    .then((obj) => {
      transformation = errorHandling(obj);
    });
  return transformation;
}

export default { fecheAPI };
