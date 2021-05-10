const conn = require('../database');

const findAll = async () => {
  const query = 'SELECT id, name, price, url_image FROM products';
  const [products] = await conn.execute(query);
  return products;
};

module.exports = {
  findAll,
};
