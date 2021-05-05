require('dotenv').config();
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const statusMsgMap = require('./dictionaries/statusMsgMap');
const { getUserByEmail } = require('../models');

const checkUser = async (email) => {
  const userInDb = await getUserByEmail(email);
  if (userInDb.err) return statusMsgMap['error in db'];
  if (!userInDb) return statusMsgMap['db search returned empty'];
  return userInDb;
};

const loginServ = async (body) => {
  try {
  const { email, password } = body;
  const checkUserRes = await checkUser(email);
  const { id, name, role } = checkUserRes;
 
  // if (!bcrypt.compareSync(password, checkUserRes.password)) return statusMsgMap['wrong password'];
  if (password !== checkUserRes.password) return statusMsgMap['wrong password'];
  
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