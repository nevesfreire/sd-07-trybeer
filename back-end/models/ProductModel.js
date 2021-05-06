const connect = require('./connection');

const getAllProducts = () => 
  connect.execute('SELECT * FROM Trybeer.products');

const getProductByName = async (name) =>
  connect.execute(
    `SELECT id, price FROM Trybeer.products WHERE name = "${name}"`,
  );

module.exports = {
  getAllProducts,
  getProductByName,
};