const UserModel = require('../model/UserModel');
const jwt = require('../helper/jwt');

const create = async (name, email, role, password) => {
  const newUser = await UserModel.create(name, email, role, password);

  if (newUser.message) {
    return { message: 'email já cadastrado.', status: 500 };
  }

  return { newUser, status: 200 };
};

const login = async (email, password) => {
  const user = await UserModel.findByEmail(email, password);
  // teste
  if (!user || password !== user.password) {
    return { message: 'email ou senha inválidos.', status: 400 };
  }
  const token = jwt.createToken({ email: user.email, role: user.role, name: user.name });
  return {
    token,
    status: 200,
    email: user.email,
    role: user.role,
    name: user.name,
  };
};

module.exports = { create, login };