const connect = require('../configuration/configuration');

const createSale = async (data) => {
  const {
    userId, 
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status,
  } = data;
  const query = 'INSERT INTO sales (user_id, total_price, delivery_address, delivery_number, sale_date, status) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status];
  await connect.execute(query, values);
}

module.exports = {
  createSale,
}
