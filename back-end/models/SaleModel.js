const connect = require('./connection');

const createSale = async ({ userId, total, address, number, date, status }) =>
  connect.execute(
    `INSERT INTO Trybeer.sales,
    VALUES ('${userId}', '${total}', '${address}', '${number}', '${date}', '${status}')`,
  );

module.exports = {
  createSale,
};

// sale_id, product_id, quantity