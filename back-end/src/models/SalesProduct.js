const connection = require('./connection');

const getSalesProductByUserId = async (id) => {
  const [data] = await connection.execute(
    `SELECT product_id, total_price, sale_date, delivery_number 
    FROM Trybeer.sales_products
        INNER JOIN Trybeer.sales AS s ON s.user_id = ${id}
        INNER JOIN Trybeer.products AS p ON p.id = product_id;`,
  );

  return data;
};

const createSalesProductBySalesIdAndProductId = async (saleId, productId, quantity) => {
  const [[data]] = await connection.execute(
    `INSERT INTO sales_products (sale_id, product_id, quantity)
    VALUES (${saleId}, ${productId}, ${quantity})`,
  );

  return data;
};

module.exports = {
  getSalesProductByUserId,
  createSalesProductBySalesIdAndProductId,
};
