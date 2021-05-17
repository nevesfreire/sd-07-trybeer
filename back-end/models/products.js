const connect = require('../configuration/configuration');

const getAllProducts = async () => {
  console.log('entrei no model');
  const [products] = await connect.execute('SELECT * FROM products');
  return products;
};

module.exports = {
  getAllProducts,
};