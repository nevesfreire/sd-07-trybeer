const jwt = require('jsonwebtoken');

const { allFieldsMustBeFilled,
  dbSearchReturnedEmpty,
  errorInDb,
  wrongPassword } = require('./dictionaries/statusMsgMap');
const { getUserByEmail } = require('../models/userModels');

const checkUser = async (email) => {
  const userInDb = await getUserByEmail(email);
  if (!userInDb) return null;
  if (userInDb.err) return errorInDb;
  return userInDb;
};

const preValidateFields = async ({ email, password }) => {
  if (!email || !password) return allFieldsMustBeFilled;
  const checkUserRes = await checkUser(email);
  if (!checkUserRes) return dbSearchReturnedEmpty;
  if (password !== checkUserRes.password) return wrongPassword;
  return checkUserRes;
};

const loginServ = async (body) => {
  try {
    const userData = await preValidateFields(body);
    const { email, id, name, role } = userData;
    if (!id) return userData;
    const payload = { id, role };
    const token = jwt.sign(payload, process.env.SECRET || '12345');
    const msgRes = { name, email, role, token };
    return { message: msgRes, status: 200 };
  } catch (err) {
    console.log('error: ', err);
    return err;
  }
};

module.exports = loginServ;