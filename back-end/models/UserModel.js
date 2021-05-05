const connection = require('./connection');

const getByEmail = async (email) => { 
  const [[user]] = await connection.execute('SELECT * FROM Trybeer.users WHERE email=?', [email]);
  return user;
};

const registerUser = async (name, email, password, role) => {
  await connection
    .execute('INSERT INTO Trybeer.users (name, email, password, role) VALUES (?,?,?,?)',
    [name, email, password, role]);
};

const registerOrder = async ({ userId, total, address, addressNumber, saleDate, status }) => {
  await connection
    .execute(`INSERT INTO Trybeer.sales (user_id, total_price,delivery_address
      ,delivery_number,sale_date,status) VALUES (?,?,?,?,?,?)`,
    [userId, total, address, addressNumber, saleDate, status]);
};

const updateUserName = async (newName, email) => {
  await connection
    .execute('UPDATE Trybeer.users SET name=? WHERE email=?',
    [newName, email]);
};

module.exports = {
  getByEmail,
  registerUser,
  updateUserName,
  registerOrder,
};
