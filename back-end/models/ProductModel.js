const connect = require('./connection');

const getAllProducts = () => 
  connect.execute('SELECT * FROM Trybeer.products');
  
module.exports = {
  getAllProducts,
};