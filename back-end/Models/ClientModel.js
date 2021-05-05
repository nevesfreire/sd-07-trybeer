const jwt = require('jsonwebtoken');
const connect = require('../config/connection');

const getEmailUser = async (email, password) => {
  const [data] = await connect
    .execute(`SELECT name, email, password, role
    FROM Trybeer.users
    WHERE email = ? AND password = ?`, [email, password]);

  return {
    name: data[0].name,
    email: data[0].email,
    role: data[0].role,
  };
};

const secret = 'umasenhaqualquer';

const jwtConfig = { expiresIn: '3d', algorithm: 'HS256' };

const token = (user) => {
  const objToken = { id: user.id, name: user.name, email: user.email, role: user.role };

  const myToken = jwt.sign({ data: objToken }, secret, jwtConfig);
  const result = {
    user: objToken,
    token: myToken,
  };
  return result;
};

module.exports = {
  getEmailUser,
  token,
};
