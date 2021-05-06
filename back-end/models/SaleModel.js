const connect = require('./connection');

const createSale = async ({ userId, total, address, number, date, status }) =>
  connect.execute(
    `INSERT INTO Trybeer.sales,
    VALUES ('${userId}', '${total}', '${address}', '${number}', '${date}', '${status}')`,
  );

const createSaleProduct = async ({ saleId, productId, quantity }) =>
connect.execute(
  `INSERT INTO Trybeer.sales_products,
  VALUES ('${saleId}', '${productId}', '${quantity}')`,
);

module.exports = {
  createSale,
  createSaleProduct,
};

// sale_id, product_id, quantity