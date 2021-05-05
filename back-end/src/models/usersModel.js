const { connection } = require('../config/conn');

const findByEmail = async (email) => {
  const [user] = await connection.execute(
    'SELECT id, name, email, role, password FROM users WHERE email=?',
    [email],
  );

  if (!user) return null;

  return user[0];
};

module.exports = {
  findByEmail,
};
