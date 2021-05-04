const connection = require('./connection');

const getProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const getProductsById = () => 'xablau';

module.exports = {
  getProducts,
  getProductsById,
};