export async function fetchUser(email, password) {
  const response = await fetch('http://localhost:3001/login', {
    method: 'GET',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
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
    headers: { 'Content-Type': 'application/json' },
  });

  // 201 success
  // 401 erro
  // 409 email usado;
  return response;
}
