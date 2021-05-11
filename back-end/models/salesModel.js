const connection = require('./connection');

const querySale = `INSERT INTO Trybeer.sales (user_id, total_price,delivery_address,
  delivery_number,sale_date,status) VALUES (?,?,?,?,?,?)`;

const saleRegister = async (orderData) => {
  const {
    price,
    address,
    deliveryNumber,
    saleDate,
    Salestatus,
    id,
  } = orderData;
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
