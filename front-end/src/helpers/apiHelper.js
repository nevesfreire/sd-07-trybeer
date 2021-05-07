import { setUser } from './localStorageHelper';

export async function fetchToken(email, password) {
  const requestTokenUrl = 'http://localhost:3001/login';
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };
  try {
    const response = await fetch(requestTokenUrl, request);
    const { name, token, role } = await response.json();
    const user = {
      name,
      email,
      token,
      role,
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
      'Content-type': 'application/json',
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
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

export async function fetchImage(name) {
  const endpoint = `http://localhost:3001/images/${name.replace('250', '350')}`;
  const response = await fetch(endpoint);
  const data = await response.blob();
  const image = URL.createObjectURL(data);
  return image;
}
