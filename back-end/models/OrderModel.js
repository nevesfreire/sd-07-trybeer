const conn = require('../database');

const getOrder = async () => {
  const query = 'SELECT '
    + 'id, total_price, delivery_address,delivery_number, status '
    + 'FROM sales';
  const [orders] = await conn.execute(query);
  return orders;
};

const getOrderDetails = async (orderId) => {
  const query = 'SELECT s.id, s.status, s.total_price, sp.quantity, p.name, p.price '
    + 'FROM sales_products AS sp '
    + 'JOIN sales AS s ON sp.sale_id = s.id '
    + 'JOIN products AS p ON sp.product_id = p.id '
    + 'WHERE sale_id=?';
  const values = [orderId];
  const [order] = await conn.execute(query, values);
  return order;
};

const closeOrder = async (orderId) => {
  const query = 'UPDATE sales SET status="Entregue" WHERE id=?';
  const values = [orderId];
  const [ResultSetHeader] = await conn.execute(query, values);
  return ResultSetHeader.changedRows;
};

module.exports = {
  getOrder,
  getOrderDetails,
  closeOrder,
};