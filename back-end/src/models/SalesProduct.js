const connection = require('./connection');

const getSalesProductByUserId = async (id) => {
  const [data] = await connection.execute(
    `SELECT total_price, sale_date, s.id, s.delivery_address, s.delivery_number, s.status
    FROM Trybeer.sales_products AS sp
    INNER JOIN Trybeer.sales AS s ON s.user_id = ${id}
    INNER JOIN Trybeer.products AS p ON p.id = sp.product_id
    GROUP BY s.id;`,
  );
  return data;
};

const createSalesProductBySalesIdAndProductId = async (
  saleId,
  productId,
  quantity,
) => {
  const [[data]] = await connection.execute(
    `INSERT INTO sales_products (sale_id, product_id, quantity)
    VALUES (${saleId}, ${productId}, ${quantity})`,
  );
    console.log(data);
  return data;
};

module.exports = {
  getSalesProductByUserId,
  createSalesProductBySalesIdAndProductId,
};
