const conn = require('../config/conn');

const createSale = async (userId, totalPrice,  street, number) => {
  const newSale = await conn.execute(
    `
    INSERT INTO users(user_id, total_price, delivery_address, delivery_number, sale_date, status) 
    VALUES (
      '${userId}', 
      '${totalPrice}', 
      '${street}', 
      '${number}',
      NOW(),
      'pendente'
    );
    `,
  );
  console.log(newSale);
  return '{ email, password }';
}

module.exports = { 
  createSale
};
