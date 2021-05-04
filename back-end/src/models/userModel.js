const conn = require('../config/conn');

const create = async () => {
  const user = await conn.execute(
    'INSERT INTO ',
  );
  return user;
};

module.exports = { create };
