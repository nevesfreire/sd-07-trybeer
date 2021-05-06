const connection = require('../config/connection');

const getAllProducts = async () => {
  const [allProducts] = await connection.execute('SELECT * FROM products');

  return allProducts;
};

module.exports = { getAllProducts };
