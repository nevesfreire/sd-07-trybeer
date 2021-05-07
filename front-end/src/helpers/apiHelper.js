import { setUser } from './localStorageHelper';

const applicationType = 'application/json';

export async function fetchToken(email, password) {
  const requestTokenUrl = 'http://localhost:3001/login';
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': applicationType,
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };
  try {
    const response = await fetch(requestTokenUrl, request);
    const { name, token, role, id } = await response.json();
    const user = {
      name,
      email,
      token,
      role,
      id,
    };
    if (token) {
      setUser(user);
      return token;
    }
    alert('Usuário ou senha inválidos!');
  } catch (error) {
    console.error(error);
  }
}

export async function fetchRegister(name, email, password, queroVender) {
  const SUCCESS = 200;
  const requestTokenUrl = 'http://localhost:3001/users';
  const request = {
    method: 'POST',
    headers: {
      'Content-type': applicationType,
    },
    body: JSON.stringify({
      name,
      email,
      password,
      queroVender,
    }),
  };
  try {
    const response = await fetch(requestTokenUrl, request);
    const responseJson = await response.json();

    if (responseJson.user) {
      await fetchToken(email, password);
      return SUCCESS;
    }
    return responseJson.message;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchProducts() {
  const endpoint = 'http://localhost:3001/products';
  const response = await fetch(endpoint)
    .then((data) => data.json())
    .catch((err) => console.log(err.message));
  return response;
}

// export async function fetchImage(name) {
//   const endpoint = `http://localhost:3001/images/${name}`;
//   await fetch(endpoint)
//     .then((data) => data)
//     .catch((err) => console.log(err.message));
// }

export async function fetchUpdateClient(name, id, token) {
  const requestTokenUrl = `http://localhost:3001/users/${id}`;
  const request = {
    method: 'PUT',
    headers: {
      'Content-type': applicationType,
      Authorization: token,
    },
    body: JSON.stringify({
      name,
    }),
  };
  try {
    const response = await fetch(requestTokenUrl, request);
    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    console.error(error);
  }
}
