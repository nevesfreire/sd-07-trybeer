const connect = require('./connection');

const registerUser = async ({ name, email, password, role }) => 
  connect.execute(
    `INSERT INTO Trybeer.users(name, email, password, role)
    VALUES ('${name}', '${email}', '${password}', '${role}')`,
  ).catch((error) => error);

const getUserEmail = async ({ email }) =>
connect.execute(
  `SELECT id, email FROM Trybeer.users
  WHERE email = "${email}"`,
).catch((error) => error);

const updateUser = async (name, email) =>
  connect.execute(
    `UPDATE Trybeer.users SET name = '${name}' WHERE email = '${email}'`,
  ).catch((error) => error);

const deleteUser = async ({ email }) =>
  connect.execute(
    `DELETE FROM Trybeer.users WHERE email = '${email}'`,
  ).catch((error) => error);

module.exports = {
  registerUser,
  getUserEmail,
  updateUser,
  deleteUser,
};