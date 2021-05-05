// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { wrongPassword, dbSearchReturnedEmpty } = require('./dictionaries/statusMsgMap');
const { getUserByEmail } = require('../models/userModels');

const loginServ = async (body) => {
  try {
    const { email, password } = body;
    
    const userInDb = await getUserByEmail(email);
    if (!userInDb) return dbSearchReturnedEmpty;
    
    const { id, name, role } = userInDb;
    
    // console.log(bcrypt.hashSync(password, 5));
    // console.log('testing wrong pass', !bcrypt.compareSync(password, userInDb.password));
    
    if (password !== userInDb.password) return wrongPassword;
    // console.log('AAHHGGG !in wrong pass', !bcrypt.compareSync(password, userInDb.password));
    
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