const connect = require('../configuration/configuration');

const getAllProducts = async () => {
  const [products] = await connect.execute('SELECT * FROM products');
  return products;
};

module.exports = {
  getAllProducts,
};