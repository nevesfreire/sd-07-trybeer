const connection = require('../config/connection');

const getAllSales = async () => {
  const [allSales] = await connection.execute('SELECT * FROM sales');

  return allSales;
};

const getSaleById = async (id) => {
  const [[sale]] = await connection.execute(
    'SELECT * FROM sales WHERE id = ?',
    [id],
  );

  return sale;
};

const putSalesLoop = async (cart, saleId) => {
  const queryThree = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';

  for (let i = 0; i < cart.length; i += 1) {
    connection.execute(queryThree, [
      saleId,
      cart[i].id,
      cart[i].quantidade,
    ]);
  }
};

const createSale = async (userId, totalPrice, delivery, cart) => {
  const { deliveryAddress, deliveryNumber } = delivery;
  const query = 'INSERT INTO sales (user_id, total_price, delivery_address, ';
  const queryTwo = 'delivery_number, sale_date, status) VALUES (?, ?, ?, ?, NOW(), ?)';
  const sale = await connection.execute(`${query}${queryTwo}`, [
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    'pendente',
  ]);
  await putSalesLoop(cart, sale[0].insertId);
  return {
    saleId: sale[0].insertId,
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
  };
};

module.exports = { getAllSales, createSale, getSaleById };
