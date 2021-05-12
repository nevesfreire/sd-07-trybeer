const conn = require('../database');

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

module.exports = {
  getOrderDetails,
};