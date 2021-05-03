const conn = require('../../config/conn');

const getAll = async () => {
  const query = 'SELECT * FROM users;';
  const [data] = await conn.execute(query);
  return data;
}; 

module.exports = {
  getAll,
};