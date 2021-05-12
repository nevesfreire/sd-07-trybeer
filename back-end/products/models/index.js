const conn = require('../../models/connection');

const getAll = async () => {
  const query = 'SELECT * FROM products;';
  const [data] = await conn.execute(query);
  return data;
};

const createOrder = async (street, houseNumber, shopCart, totalProducts) => {
  const query = 'SELECT * FROM products;';
  const [data] = await conn.execute(query);
  return data;
};

module.exports = {
  getAll,
};
