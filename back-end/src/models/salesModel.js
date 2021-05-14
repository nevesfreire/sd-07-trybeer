const { StatusCodes } = require('http-status-codes');
const { connection } = require('../config/conn');

const insertOne = `INSERT INTO sales (user_id, total_price,
  delivery_address,delivery_number,status, sale_date) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP())`;

const insetSaleProduct = `INSERT INTO sales_products (sale_id, product_id, quantity)
VALUES (?,?,?)`;

const selectSales = 'SELECT * FROM Trybeer.sales';

const saleById = `SELECT sp.sale_id, p.name, p.price, sp.quantity, s.status
FROM Trybeer.sales_products as sp
INNER JOIN Trybeer.products as p on p.id  = sp.product_id
INNER JOIN Trybeer.sales as s WHERE sp.sale_id = ?`;

const createSale = async (salesData) => {
  const {
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status,
  } = salesData;

  const [result] = await connection.execute(insertOne, [
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
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

const getAllSales = async (_request, response) => {
  try {
    const [result] = await connection.execute(selectSales);
    return result;
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message });
  }
};

const getSaleById = async (_request, response) => {
  try {
    const [result] = await connection.execute(saleById);
  return result;
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message });
  }
};

module.exports = {
  createSale,
  createSalesProducts,
  getAllSales,
  getSaleById,
};
