const connection = require('./connection');

const getProductsList = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  return result;
};

module.exports = {
  getProductsList,
};
