const conn = require('../../config/connect');

const update = async (status, id) => conn.execute(
  'update sales SET status = ? WHERE id = ?', [status, id],
);

module.exports = { update };
