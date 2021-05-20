// const connect = require('./connection');

// const getAllProducts = () => 
//   connect.execute('SELECT * FROM Trybeer.products');

// const getProductByName = async (name) => {
//   const result = await connect.execute(
//     `SELECT id, price FROM Trybeer.products WHERE name = "${name}"`,
//   );
//   return result[0];
// };

// module.exports = {
//   getAllProducts,
//   getProductByName,
// };