const conn = require('../config/conn');

const createSale = async (userId, totalPrice, street, number) => {
  const [{ insertId }] = await conn.execute(
    `
    INSERT INTO sales(user_id, total_price, delivery_address, delivery_number, sale_date, status) 
    VALUES (
      ${userId}, 
      ${totalPrice}, 
      '${street}', 
      '${number}',
      NOW(),
      'Pendente'
    );
    `,
  );
  return insertId;
};

const createSaleProducts = async (productsSaled) => {
  const [{ insertId }] = await conn.query(
    `
    INSERT INTO sales_products(sale_id, product_id, quantity) 
    VALUES ?;
    `,
    [productsSaled],
  );
  return insertId;
};

const getSalesByUserId = async (userId) => {
 const [result] = await conn.query(`
  SELECT * FROM sales
  WHERE user_id = ${userId};
  `);
  return result;
};

const getAllSales = async () => {
  const [result] = await conn.query(`
  SELECT * FROM sales
  `);
  return result;
};

module.exports = { 
  createSale,
  createSaleProducts,
  getSalesByUserId,
  getAllSales,
};
