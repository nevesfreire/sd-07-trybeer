const endpoint = 'http://localhost:3001';

async function registerUser(data) {
  const response = await (await fetch(`${endpoint}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })).json();

  return response;
}

export default {
  registerUser,
};
