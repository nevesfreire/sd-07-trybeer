const connection = require('./connection');

const createSale = async (userId, purchaseRequest, saleDate, status) => {
  const [result] = await connection.execute(`INSERT INTO sales
    (user_id, total_price, delivery_address, delivery_number, sale_date, status)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [userId,
      purchaseRequest.total_price,
      purchaseRequest.delivery_address,
      purchaseRequest.delivery_number,
      saleDate,
      status]);
  return result;
};

const createSaleProducts = async (saleId, id, quantity) => {
  const [result] = await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, id, quantity],
  );
  return result;
};

module.exports = {
  createSale,
  createSaleProducts,
};
