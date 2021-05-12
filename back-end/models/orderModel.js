const connection = require('./connection');

const getAllOrders = async () => {
  const [allRows] = await connection.execute(
    'SELECT * FROM sales',
  );
  return allRows;
};
const getOrderById = async (id) => {
  const [row] = await connection.execute(
    'SELECT * FROM sales WHERE user_id = ?',
    [id],
  );
  return row;
};

const getOrderDetails = async (id) => {
  const [orderDetail] = await connection.execute(
  'SELECT sales_products.sale_id, DATE_FORMAT(sales.sale_date, "%d/%m") AS sale_date,'
  + ' products.name, sales_products.quantity, products.price * sales_products.quantity AS total,'
  + ' sales.status FROM sales_products JOIN sales ON sales_products.sale_id = sales.id'
  + ' JOIN products ON sales_products.product_id = products.id'
  + ' WHERE sales_products.sale_id = ?', [id],
  );
  return orderDetail;
};

module.exports = {
  getAllOrders,
  getOrderById,
  getOrderDetails,
};
