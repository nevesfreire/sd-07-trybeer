const connection = require('../config/connection');

const createSale = async (userId, totalPrice, deliveryAddress, deliveryNumber) => {
  const pendente = 'pendente';
  await
    connection.execute(
      ` INSERT INTO sales
      (user_id, total_price, delivery_address, delivery_number, status, sale_date)
      VALUES (?,?,?,?,?,NOW())`,

      [userId, totalPrice, deliveryAddress, deliveryNumber, pendente],
    );
  const [[lastSale]] = await connection.execute('SELECT MAX(id) as lastId FROM sales');
  return lastSale;
};

const salesProducts = async (saleId, arrayProducts) => {
  const arrayWithId = arrayProducts.map((product) => {
    const { id, quantity } = product;
    return [id, quantity, saleId];
  });
  // https://stackoverflow.com/questions/8899802/how-do-i-do-a-bulk-insert-in-mysql-using-node-js
  // Ajuda do Vitor Rodrigues e Lucas Zago grupo 21
  await connection.query('INSERT INTO sales_products (product_id, quantity, sale_id) VALUES ?',
    [arrayWithId]);
};

module.exports = {
  createSale,
  salesProducts,
};
