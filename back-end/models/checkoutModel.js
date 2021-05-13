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

  const values = [userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status];
  await connect.execute(
    `INSERT INTO sales (user_id, total_price, delivery_address, delivery_number, sale_date, status)
    VALUES(?, ?, ?, ?, ?, ?)`, values);
};

const productPrice = async (productId) => {
  const [[{ price }]] = await connect.execute('SELECT price FROM products WHERE id = ?', [productId]);
  return price;
};

module.exports = {
  createSale,
  productPrice,
};