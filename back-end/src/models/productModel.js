const conn = require('../config/conn');

const getAllProducts = async () => {
  const [products] = await conn.execute(
    'SELECT * FROM products;',
  );
  return products;
};

module.exports = { 
  getAllProducts,
 };
