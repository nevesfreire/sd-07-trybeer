const connect = require('./connection');

const createProduct = async ({ name, price, image }) =>
  connect.execute(
    `INSERT INTO Trybeer.products(name, price, url_image),
    VALUES ('${name}', '${price}', '${image}')`,
  );

module.exports = {
  createProduct,
};