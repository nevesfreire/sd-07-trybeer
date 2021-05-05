const UserModel = require('../model/UserModel');
const jwt = require('../helper/jwt');

const create = async (name, email, role, password) => {
  let roleExists = role ? role : 'client'; 
  const newUser = await UserModel.create(name, email, roleExists, password);
  return { newUser, status: 200 };
};

const login = async (email, password) => {
  const user = await UserModel.findByEmail(email, password);
  if (!user || password !== user.password) {
    throw new Error('Email ou senha inválidos');
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