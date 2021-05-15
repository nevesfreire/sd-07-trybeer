const { connection } = require('../config/conn');

const selectAllOrders = `SELECT s.id, s.total_price AS price,
DATE_FORMAT(s.sale_date, "%d/%m") AS date
FROM sales AS s
INNER JOIN users AS u ON s.user_id = u.id
WHERE email=?
ORDER BY id`;

const getOrders = async (email) => {
  const [orders] = await connection.execute(selectAllOrders, [email]);
  return orders;
};

module.exports = {
  getOrders,
};
