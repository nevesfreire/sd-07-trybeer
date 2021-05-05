require('dotenv').config();
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const statusMsgMap = require('./dictionaries/statusMsgMap');
const { getUserByEmail } = require('../models');

const loginServ = async (body) => {
  try {
  const { email, password } = body;
  const userInDb = await getUserByEmail(email);
  if (!userInDb) return statusMsgMap['db search returned empty'];
  const { id, name, role } = userInDb;
 
  // if (!bcrypt.compareSync(password, userInDb.password)) return statusMsgMap['wrong password'];
  if (password !== userInDb.password) return statusMsgMap['wrong password'];
  
  const payload = { id, role };
  const token = jwt.sign(payload, process.env.SECRET || '12345');
  const msgRes = { name, email, role, token };
  return { message: msgRes, status: 200 };
  } catch (err) {
    console.log(err);
    return (err);
  }
};

module.exports = loginServ;