import axios from 'axios'; 

const PORT = process.env.PORT;

async function loginRequest (email, password) {
  const endpoint = `http://localhost:${PORT}/login`;
  let response = {};

  try {
    response = await axios.post(endpoint, {
      email,
      password,
    });
    console.log(response);
    return response;
  } catch (error) {
    return error.response;
  }
}

export default loginRequest;