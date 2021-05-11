const jwt = require('jsonwebtoken');

const { wrongPassword, dbSearchReturnedEmpty, errorInDb } = require('./dictionaries/statusMsgMap');
const { getUserByEmail } = require('../models/userModels');

const checkUser = async (email) => {
  const userInDb = await getUserByEmail(email);
  if (!userInDb) return dbSearchReturnedEmpty;
  if (userInDb.err) return errorInDb;
  return userInDb;
};

const loginServ = async (body) => {
  try {
  const { email, password } = body;
  const checkUserRes = await checkUser(email);
  const { id, name, role } = checkUserRes;
 
  if (password !== checkUserRes.password) return wrongPassword;
  
  const payload = { id, role };
  const token = jwt.sign(payload, process.env.SECRET || '12345');
  const msgRes = { name, email, role, token };
  return { message: msgRes, status: 200 };
  } catch (err) {
    console.log('error: ', err);
    return (err);
  }
};

module.exports = loginServ;