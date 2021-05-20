// const connect = require('./connection');

// const createSale = async (userId, total, address, number) =>
//   connect.execute(
//     `INSERT INTO Trybeer.sales
//     (user_id, total_price, delivery_address, delivery_number, sale_date, status)
//     VALUES ("${userId}", "${total}", "${address}", "${number}", CURRENT_TIMESTAMP, 'Pendente')`,
//   );

// const createSaleProduct = async (saleId, productId, quantity) =>
// connect.execute(
//   `INSERT INTO Trybeer.sales_products
//   VALUES ("${saleId}", "${productId}", "${quantity}")`,
// );

// const getSaleByUserId = (userId) => 
//   connect.execute(`SELECT id, sale_date, total_price 
//     FROM Trybeer.sales WHERE user_id = "${userId}"`)
//   .then((sale) => sale[0]);

// const getSaleById = async (userId, saleId) => 
//   connect.execute(`SELECT sale_id, sale_date, quantity, name, price, total_price, user_id 
//   FROM Trybeer.sales AS s
//   INNER JOIN Trybeer.sales_products AS sp ON sp.sale_id = s.id
//   INNER JOIN Trybeer.products AS p ON p.id = sp.product_id
//   GROUP BY p.name, sp.sale_id
//   HAVING sale_id = "${saleId}" AND user_id = "${userId}"`)
//   .then((response) => response[0]);

// const getAllSales = async () =>
//   connect.execute('SELECT * FROM Trybeer.sales');

// const updateSaleStatus = async (id, status) =>
//   connect.execute(`UPDATE Trybeer.sales
//   SET status = '${status}'
//   WHERE id = '${id}'`);

// const adminGetSaleById = async (saleId) => 
//   connect.execute(`SELECT sale_id, sale_date, quantity, name, price, total_price, user_id 
//   FROM Trybeer.sales AS s
//   INNER JOIN Trybeer.sales_products AS sp ON sp.sale_id = s.id
//   INNER JOIN Trybeer.products AS p ON p.id = sp.product_id
//   GROUP BY p.name, sp.sale_id
//   HAVING sale_id = "${saleId}"`)
//   .then((response) => response[0]);

// module.exports = {
//   createSale,
//   createSaleProduct,
//   getSaleByUserId,
//   getSaleById,
//   getAllSales,
//   updateSaleStatus,
//   adminGetSaleById,
// };