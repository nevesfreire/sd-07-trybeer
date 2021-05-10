const connection = require('./connection');

const getOrdersUser = async (idUser) => {
  const [result] = await connection.execute('SELECT * FROM sales WHERE user_id=?', [idUser]);
  return result;
};

const getOrdersAdmin = async () => {
  const [result] = await connection.execute('SELECT * FROM sales');
  return result;
};

module.exports = {
  getOrdersUser,
  getOrdersAdmin,
};
