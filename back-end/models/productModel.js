const connection = require('./connection');

const getAllProducts = async () => {
  const [allRows] = await connection.execute(
    'SELECT * FROM products');
  return allRows;
};
const getProductById = async (id) => {
  const [row] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return row;
};

module.exports = {getAllProducts, getProductById}
