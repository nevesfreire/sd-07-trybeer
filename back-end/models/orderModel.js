const connection = require('./connection');

const getAllOrders = async () => {
  const [allRows] = await connection.execute(
    'SELECT * FROM sales');
  return allRows;
};
const getOrderById = async (id) => {
  const [row] = await connection.execute(
    'SELECT * FROM sales WHERE user_id = ?',
    [id],
  );
  return row;
};

module.exports = {getAllOrders, getOrderById}
