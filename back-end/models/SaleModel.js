const connect = require('./connection');

const createSale = async (userId, total, address, number) =>
  connect.execute(
    `INSERT INTO Trybeer.sales
    (user_id, total_price, delivery_address, delivery_number, sale_date, status)
    VALUES ("${userId}", "${total}", "${address}", "${number}", CURRENT_TIMESTAMP, 'Pendente')`,
  );

const createSaleProduct = async (saleId, productId, quantity) =>
connect.execute(
  `INSERT INTO Trybeer.sales_products
  VALUES ("${saleId}", "${productId}", "${quantity}")`,
).catch((err) => console.log(err.message));

module.exports = {
  createSale,
  createSaleProduct,
};

// sale_id, product_id, quantity