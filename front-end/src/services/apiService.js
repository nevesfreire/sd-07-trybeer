const userLogin = async ({ email, password }) => {
  try {
    const request = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const response = await request.json();
    return response;
  } catch (err) {
    console.error(err);
  }
};

export default userLogin;
