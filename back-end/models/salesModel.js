/* eslint-disable max-lines-per-function */
const connection = require('./connection');

const queryUser = 'SELECT id FROM Trybeer.users WHERE email = ?';
const querySale = `INSERT INTO Trybeer.sales (user_id, total_price,delivery_address,
  delivery_number,sale_date,status) VALUES (?,?,?,?,?,?)`;

const saleRegister = async (orderData) => {
  const { email,
    price,
    address,
    deliveryNumber,
    saleDate,
    Salestatus } = orderData;
  const [user] = await connection.execute(queryUser, [email]);
  console.log(user[0]);
  const { id } = user[0];
  const [registeredSale] = await connection.execute(querySale, [
    id,
    price,
    address,
    deliveryNumber,
    saleDate,
    Salestatus,
  ]);
  console.log(registeredSale);
};

module.exports = {
  saleRegister,
};
