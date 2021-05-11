const connection = require('../config/connection');

const getAllSales = async () => {
  const [allSales] = await connection.execute('SELECT * FROM sales');

  return allSales;
};

const getSaleById = async (id) => {
  const query = `SELECT p.id AS 'product_id', p.name, p.price, sp.quantity, sp.sale_id, 
  s.total_price, s.sale_date, s.\`status\`
  FROM products AS \`p\`
  INNER JOIN sales_products AS \`sp\`
  ON p.id = sp.product_id
  INNER JOIN sales AS \`s\`
  ON sp.sale_id = s.id
  WHERE sp.sale_id = ?;`;

  const [sale] = await connection.execute(query, [id]);

  return sale;
};

// prettier-ignore
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

// prettier-ignore
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
