const { connection } = require('../config/conn');

const insertOne = `INSERT INTO sales (user_id, total_price,
  delivery_address,delivery_number,status, sale_date) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP())`;

const insetSaleProduct = `INSERT INTO sales_products (sale_id, product_id, quantity)
VALUES (?,?,?)`;

const createSale = async (salesData) => {
  const {
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status,
  } = salesData;

  const [result] = await connection.execute(insertOne, [
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status,
  ]);

  const saleId = result.insertId;
  return { saleId, ...salesData };
};

const createSalesProducts = async (salesId, listproducts) => {
    Promise.all(
       listproducts.map(async (product) => {
         await connection.execute(insetSaleProduct, [salesId, product.id, product.quantity]);
       }),
     );
};

module.exports = {
  createSale,
  createSalesProducts,
};
