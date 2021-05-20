const connection = require('./connection');

module.exports = {
  async getByEmailAndPassword(email, password) {
    const [data] = await connection.execute(
      `SELECT * FROM Trybeer.users 
        WHERE email = ? AND password = ?;`, [email, password],
      );
    return data[0];
  },
};