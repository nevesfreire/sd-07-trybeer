const connection = require('./connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM Trybeer.products';
  const [users] = await connection.execute(query);
  return users;
};

module.exports = {
  getAllProducts,
};