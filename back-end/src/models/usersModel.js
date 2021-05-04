const { connection } = require('../config/conn');

const findByEmail = async (email) => {
  const [user] = await connection.execute(
    'SELECT name, email, role FROM users WHERE email=?',
    [email],
  );

  if (!user) return null;

  return user;
};

module.exports = {
  findByEmail,
};
