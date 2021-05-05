import { setUser } from './localStorageHelper';

export async function fetchToken(emailInput, password) {
  const requestTokenUrl = 'http://localhost:3001/login';
  const request = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      emailInput,
      password,
    }),
  };
  try {
    const response = await fetch(requestTokenUrl, request);
    const { name, email, token, role } = await response.json();
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
  const requestTokenUrl = 'http://localhost:3001/register';
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

    if (responseJson.status === SUCCESS) {
      fetchToken(email, password);
      return SUCCESS;
    }
    alert('Ero no cadastro do usuário!');
  } catch (error) {
    console.error(error);
  }
}
