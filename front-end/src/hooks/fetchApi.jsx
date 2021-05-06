// const { useState, useEffect } = require('react');

const URL = 'http://localhost:3001';

const fetchApi = async (endpoint, method, body, token = '') => {
  console.log(URL + endpoint);
  const requestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(body),
  };
  console.log('requestOptions', requestOptions);
  const request = await fetch(URL + endpoint, requestOptions);
  const response = await request.json();
  console.log(response);
  return response;
  // .then((response) => response.json())
  // .then((data) => console.log(data))
  // .catch((err) => {
  //   console.error(err);
  // });
};

export default fetchApi;

// const [loading, setLoading] = useState(true);

// const [request, setRequest] = useState({});

// useEffect(() => {
//   fetch(URL + endpoint, {
//     method,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: token,
//     },
//     body: JSON.stringify(body),
//   })
//     .then((response) => response.json())
//     .then((data) => setRequest(data))
//     .catch((err) => {
//       console.error(err);
//     });
//   setLoading(false);
// }, [endpoint, method, token, body]);
// return [loading, request];
