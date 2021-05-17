const connect = require('../configuration/configuration');

const getOrdersByUser = async (userId) => {
  const [orders] = await connect.execute(
    'SELECT * FROM sales WHERE user_id = ?', [userId],
  );
  return orders;
};

module.exports = {
  getOrdersByUser,
};
