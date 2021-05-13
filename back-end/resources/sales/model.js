const conn = require('../../config/connect');

const getById = async (id) => {  
  const [[sale]] = await conn.execute(
    'SELECT * FROM sales WHERE sales.id = ?;', [id],
  );  
  return sale;
};

const updateStatus = async (status, id) => conn.execute(
  'update sales SET status = ? WHERE id = ?', [status, id],
);

module.exports = { getById, updateStatus };
