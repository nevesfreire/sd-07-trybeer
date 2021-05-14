const { connection } = require('../config/conn');

const getAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  
  return products;
};

const getById = async (id) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id=?', [id]);

  return product[0];
};

module.exports = {
  getAllProducts,
  getById,
};
