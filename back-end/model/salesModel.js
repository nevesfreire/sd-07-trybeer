const connection = require('../config/connection');

const createSale = async (userId, totalPrice, deliveryAddress, deliveryNumber) => {
  const pendente = 'Pendente';
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

const getSalesById = async (userId) => {
  const [result] = await connection.execute('SELECT * FROM sales WHERE user_id = ?', [userId]);
  return result;
};

const getDetailsById = async (saleId) => {
  const [[result]] = await connection.execute('SELECT * FROM sales WHERE id = ?', [saleId]);
  return result;
};

const getProductsBySaleId = async (saleId) => {
  const [result] = await connection.execute(`SELECT sales_products.quantity as qtd, 
  products.name as nome, 
  (sales_products.quantity * products.price) as total 
  FROM sales_products
  INNER JOIN products ON sales_products.product_id = products.id
  WHERE sales_products.sale_id = ?`, [saleId]);
  return result;
};

const updateStatusBySaleId = async (saleId) => {
  const ENTREGUE = 'Entregue';
  await connection.execute('UPDATE sales SET status = ? WHERE id = ?', [ENTREGUE, saleId]);
};

module.exports = {
  createSale,
  salesProducts,
  getSalesById,
  getProductsBySaleId,
  updateStatusBySaleId,
  getDetailsById,
};
