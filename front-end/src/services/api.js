const headers = { 'Content-Type': 'application/json' };

export async function fetchUser(email, password) {
  const response = await fetch('http://localhost:3001/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers,
  });
  const user = await response.json();
  return user;
}

export async function fetchRegisterNewUser({ name, password, email, role }) {
  const response = await fetch('http://localhost:3001/user', {
    method: 'POST',
    body: JSON.stringify({
      name, password, email, role,
    }),
    headers,
  });

  // 201 success
  // 401 erro
  // 409 email usado;
  return response;
}

export async function fetchProductList() {
  const response = await fetch('http://localhost:3001/products', {
    method: 'GET',
    headers,
  });
  const list = await response.json();
  console.log(list);
  return list;
}
