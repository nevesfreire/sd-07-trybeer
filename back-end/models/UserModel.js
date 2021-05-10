const connection = require('./connection');

const getByEmail = async (email) => { 
  const query = 'SELECT * FROM Trybeer.users WHERE email=?';
  const [[user]] = await connection.execute(query, [email]);
  return user;
};

const registerUser = async (name, email, password, role) => {
  const query = 'INSERT INTO Trybeer.users (name, email, password, role) VALUES (?,?,?,?)';
  const [result] = await connection.execute(query, [name, email, password, role]);
  return ({ id: result.insertId, name, email, role });
};

const registerOrder = async ({ userId, totalCart, address, addressNumber, saleDate, status }) => {
  const query = `INSERT INTO Trybeer.sales (user_id, total_price,delivery_address,
    delivery_number,sale_date,status) VALUES (?,?,?,?,?,?)`;
  const [result] = await connection
    .execute(query, [userId, totalCart, address, addressNumber, saleDate, status]);
  return ({ id: result.insertId, userId, totalCart, address, addressNumber, saleDate, status });
};

const getOrderByUserId = async (userId) => { 
  const [[order]] = await connection
    .execute('SELECT * FROM Trybeer.sales WHERE user_id=?', [userId]);
  return order;
};

const updateUserName = async (newName, email) => {
  const query = 'UPDATE Trybeer.users SET name=? WHERE email=?';
  await connection.execute(query, [newName, email]);
};

const getDate = async () => {
  const [[saleDate]] = await connection.execute('SELECT now() AS saleDate');
  return saleDate.saleDate;
};
const getOrderDetailsById = async (orderId) => {
  const [ordersDetails] = await connection
    .execute(`select products.name,products.price,sales_products.quantity
    , sales_products.sale_id
    FROM  sales
    INNER JOIN sales_products ON sales.id = sales_products.sale_id
    INNER JOIN products ON sales_products.product_id = products.id
    where sale_id = ?;`,
    [orderId]);
  return ordersDetails;
};
const getAllOrders = async () => {
  const [sales] = await connection
    .execute('SELECT * FROM Trybeer.sales');
  return sales;
};

module.exports = {
  getByEmail,
  registerUser,
  updateUserName,
  registerOrder,
  getAllOrders,
  getOrderDetailsById,
  getOrderByUserId,
  getDate,
};
