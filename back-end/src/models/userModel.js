const conn = require('../config/conn');

const create = async () => {
  const user = await conn.execute(
    'INSERT INTO ',
  );
  return user;
};

const getByEmail = async (emailInput) => {
  const [[user]] = await conn.execute(
    `SELECT * FROM users WHERE email LIKE('${emailInput}') LIMIT 1;`,
  );
  return user;
};

module.exports = { 
  create,
  getByEmail,
 };
