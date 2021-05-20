const connection = require('./connection');

module.exports = {
  async getByEmailAndPassword(email, password) {
    const [data] = await connection.execute(
      `SELECT id, name, email, role 
        FROM Trybeer.users 
        WHERE email = ? AND password = ?;`, [email, password],
      );
    return data[0];
  },
};