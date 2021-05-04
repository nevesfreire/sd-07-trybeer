const { instance } = require('./apiInstance');

const registerUser = async (name, email, role, password) => {
  const result = await instance.post('register', { name, email, role, password }) 
  return result
};


export default registerUser;