const connection = require('./connection');

const create = async (name, email, role, password) => {
  try {
    const newUser = await connection.execute(
      'INSERT INTO users (name, email, role, password) VALUES (?,?,?,?)',
      [name, email, role, password],
    );
    return { id: newUser[0].insertId, name, email, role, password };
  } catch (error) { 
    throw new Error('Email já cadastrado');
   }
};

const findByEmail = async (email) => {
  try {
    const user = await connection.execute(
      'SELECT * FROM users WHERE email = ?', [email],
    );
    return user[0][0];
  } catch (e) { 
    throw new Error('Erro de conexão');
   }
};

const updateByEmail = async (oldEmail, newEmail) => {
  try {
    const user = await connection.execute(
      'UPDATE users SET email = ? WHERe email = ?', [newEmail, oldEmail],
    );
    return user;
  } catch (e) { 
    throw new Error('Email já cadastrado.');
   }
};
module.exports = { create, findByEmail, updateByEmail };