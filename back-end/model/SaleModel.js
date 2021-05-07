const connection = require('./connection');

const create = async (tudao) => {
  const { userId, tPrice, dAddress, dNumber, date, status } = tudao;
  try {
    const newUser = await connection.execute(
      `INSERT INTO sales (user_id,total_price,delivery_address,delivery_number,sale_date,status) 
      VALUES (?,?,?,?,?,?)`,
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
      `SELECT delivery_number,
      date_format(sale_date, '%d/%m') AS date,total_price FROM sales ORDER BY id`,
    );
    return sales[0];
  } catch (error) {
    throw new Error('Erro de conexão');
  }
};

const getByOrderNumber = async (orderNumber) => {
  try {
    const sale = await connection.execute(
      `
        SELECT ss.delivery_number, date_format(ss.sale_date, '%d/%m') AS date,
        sp.quantity, p.name, p.price
        FROM sales AS ss
        INNER JOIN sales_products AS sp ON ss.id = sp.sale_id
        INNER JOIN products AS p ON sp.product_id = p.id
        WHERE ss.id = ?
      `,
     [orderNumber],
    );
    return sale[0];
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { create, getAll, getByOrderNumber };
