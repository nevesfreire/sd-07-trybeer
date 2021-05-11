const connection = require('../configuration/configuration');

const loginModel = async (email) => {
  console.log('entrei no model');
  console.log(email)
  const [login] = await connection.execute(
    'SELECT * FROM users WHERE email = ?',
    [email],
  );
  return login[0];
};

module.exports = {
  loginModel,
};