const connection = require('./connection');

const getSalesProductByUserId = async (id) => {
  const [data] = await connection.execute(
    `SELECT total_price, sale_date, s.id, s.delivery_address, s.delivery_number, s.status
    FROM Trybeer.sales_products AS sp
    INNER JOIN Trybeer.sales AS s ON s.user_id = ${id}
    INNER JOIN Trybeer.products AS p ON p.id = sp.product_id
    GROUP BY s.id
    ORDER BY s.id ASC;`,
  );
  return data;
};

const getSalesProductBySaleId = async (id) => {
  const [data] = await connection.execute(
    `SELECT p.url_image, p.price, s.total_price, sp.quantity, p.id, p.name
        FROM Trybeer.sales_products AS sp
        INNER JOIN Trybeer.sales AS s ON s.id = ${id}
        INNER JOIN Trybeer.products AS p ON p.id = sp.product_id`,
  );
  return data;
};

const createSalesProductBySalesIdAndProductId = async (
  saleId,
  productId,
  quantity,
) => {
  const [data] = await connection.execute(
    `INSERT INTO sales_products (sale_id, product_id, quantity)
    VALUES (${saleId}, ${productId}, ${quantity})`,
  );
  return data[0];
};

const getAllOrders = async () => {
  const [data] = await connection.execute(
    'SELECT * FROM Trybeer.sales',
  );

  return data.map(({ id, user_id, total_price, delivery_address, delivery_number, sale_date, status }) => ({
    id,
    user_id,
    total_price,
    delivery_address,
    delivery_number,
    sale_date,
    status,
  }));
};

module.exports = {
  getSalesProductByUserId,
  createSalesProductBySalesIdAndProductId,
  getSalesProductBySaleId,
  getAllOrders,
};
