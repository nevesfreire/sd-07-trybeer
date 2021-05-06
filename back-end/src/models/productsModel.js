const { connection } = require('../config/conn');

const getAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  
  return products;
};

module.exports = {
  getAllProducts,
};
