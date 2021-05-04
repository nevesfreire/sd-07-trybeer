require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const statusMsgMap = require('./dictionaries/statusMsgMap');
const getUserByEmail = require('../models');

const loginServ = async (body) => {
  try {
  const { email, password } = body;
  const userInDb = await getUserByEmail(email);
  if (!userInDb) return statusMsgMap['db search returned empty'];
  const { id, role } = userInDb;
  if (!bcrypt.compareSync(password, userInDb.password)) return statusMsgMap['wrong password'];
  const payload = { id, role };
  const token = jwt.sign(payload, process.env.SECRET || '12345');
  return { token, status: 'OK' };
  } catch (err) {
    console.log(err);
    return (err);
  }
};

module.exports = loginServ;