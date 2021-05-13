const conn = require('../../config/connect');

const getAll = async () => {
  const [users] = await conn.execute(
    'SELECT * FROM users;',
  );
  return users;
};

const getByEmail = async (email) => {
  const [[user]] = await conn.execute(
    'SELECT * FROM users WHERE users.email = ?;', [email],
  );
  return user;
};

const create = async (name, email, password, role) => conn.execute(
  `INSERT INTO users (name, email, password, role) VALUES
    (?, ?, ?, ?)`, [name, email, password, role],
);

const getOrders = async (emailForGetId) => {
  const [[ordersByEmail]] = await conn.execute(
    'SELECT CLT.id AS "userId", SALE.sale_date AS "dateOrder", SALE.total_price AS "totalPrice", SALE.id AS "orderId" FROM users AS CLT INNER JOIN sales AS SALE ON CLT.id = SALE.user_id AND CLT.email = ?;', [emailForGetId],
  );
  return ordersByEmail;
};

module.exports = { getAll, getByEmail, create, getOrders };

/*
SELECT CLT.id AS "userId",
SALE.sale_date AS "dateOrder",
SALE.total_price AS "totalPrice",
SALE.id AS "orderId"
FROM users AS CLT
INNER JOIN sales AS SALE
ON CLT.id = SALE.user_id
AND CLT.email = ?;
*/
