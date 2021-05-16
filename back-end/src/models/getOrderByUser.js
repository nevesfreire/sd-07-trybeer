const connection = require('./connection');
require('dotenv').config();

const getOrdersByUser = async (id) => {
  const [data] = await connection.execute(
    `SELECT product_id, total_price, sale_date, delivery_number 
    FROM Trybeer.sales_products INNER JOIN Trybeer.sales AS s 
    ON s.user_id = ${id} INNER JOIN Trybeer.products AS p 
    ON p.id = product_id;`,
  );

  return data;
};

module.exports = {
  getOrdersByUser,
};
