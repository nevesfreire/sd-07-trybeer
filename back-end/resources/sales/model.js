const conn = require('../../config/connect');

const updateStatus = async (status, id) => conn.execute(
  'update sales SET status = ? WHERE id = ?', [status, id],
);

module.exports = { updateStatus };
