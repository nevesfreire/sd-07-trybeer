const { StatusCodes } = require('http-status-codes');
const { connection } = require('../config/conn');

const insertOne = `INSERT INTO sales (user_id, total_price,
  delivery_address,delivery_number,status, sale_date) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP())`;

const insetSaleProduct = `INSERT INTO sales_products (sale_id, product_id, quantity)
VALUES (?,?,?)`;

const selectSales = 'SELECT * FROM Trybeer.sales';

const saleById = `SELECT
sp.sale_id,
p.name, p.price,
sp.quantity,
s.status,
DATE_FORMAT(s.sale_date, "%d/%m") AS sale_date
FROM Trybeer.sales_products AS sp
INNER JOIN Trybeer.products AS p on p.id = sp.product_id
INNER JOIN Trybeer.sales AS s on s.id = sp.sale_id
WHERE sp.sale_id = ?`;

const changeStatus = 'UPDATE Trybeer.sales set status = ?';

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

const getSaleById = async (id) => {
  const [result] = await connection.execute(saleById, [id]);
  return result;  
};

const statusChange = async (status) => {
  const [result] = await connection.execute(changeStatus, [status]);
  return result;
};

module.exports = {
  createSale,
  createSalesProducts,
  getAllSales,
  getSaleById,
  statusChange,
};
