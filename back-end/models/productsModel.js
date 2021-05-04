const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const getProductsById = () => 'xablau';

module.exports = {
  getAllProducts,
  getProductsById,
};