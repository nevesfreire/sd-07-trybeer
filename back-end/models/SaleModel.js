const connect = require('./connection');

const createSale = async ({ userId, total, address, number, date, status }) =>
  connect.execute(
    `INSERT INTO Trybeer.sales,
    VALUES ('${userId}', '${total}', '${address}', '${number}', '${date}', '${status}')`,
  );

const getProductById = async ({ id, price }) =>
    connect.execute(
      `SELECT id, price FROM Trybeer.products WHERE id = ${id} AND price = ${price}`,
    );
  
module.exports = {
  createSale,
  getProductById,
};

// sale_id, product_id, quantity