const conn = require('../../config/connect');

const getAll = async () => {
  const [products] = await conn.execute(
    'SELECT * FROM products;',
  );
  return products;
};

module.exports = { getAll };
