const connection = require('./connection');

const create = async (tudao) => {
  const { userId, tPrice, dAddress, dNumber, date, status } = tudao;
  try {
    const newUser = await connection.execute(
      'INSERT INTO sales (user_id,total_price,delivery_address,delivery_number,sale_date,status) VALUES (?,?,?,?,?,?)',
      [userId, tPrice, dAddress, dNumber, date, status],
    );
    return newUser[0].insertId;
  } catch (error) {
    console.log(error);
    throw new Error('Erro de conexão');
  }
};

const getAll = async () => {
  try {
    const sales = await connection.execute(
      'SELECT delivery_number,day(sale_date) AS day,month(sale_date) AS month,total_price FROM sales ORDER BY id',
    );
    return sales[0];
  } catch (error) {
    throw new Error('Erro de conexão');
  }
};

module.exports = { create, getAll };
