const connection = require('./connection');

const createSale = async (user_id, total_price, delivery_address, delivery_number, sale_date, status) => {
  console.log('entrou no model')
  const [result] = await connection.execute('INSERT INTO sales (user_id, total_price, delivery_address, delivery_number, sale_date, status) VALUES (?, ?, ?, ?, ?, ?)', [user_id, total_price, delivery_address, delivery_number, sale_date, status]);
  return result;
};

module.exports = {
  createSale,
};