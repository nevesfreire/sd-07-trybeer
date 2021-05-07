const connection = require('./connection');

const create = async (tudao) => {
  const { userId, totalPrice, deliveryAddress, deliveryNumber, date, status } = tudao;
  try {
    const newUser = await connection.execute(
      'INSERT INTO sales (user_id, total_price, delivery_address, delivery_number, sale_date, status) VALUES (?,?,?,?,?,?)',
      [userId, totalPrice, deliveryAddress, deliveryNumber, date, status],
    );
    return newUser[0].insertId;
  } catch (error) {
    console.log(error);
    throw new Error('Erro de conexão');
  }
};

module.exports = { create };
