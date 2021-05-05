const model = require('./model');

const getAll = async () => (model.getAll());

const getByEmail = async (email) => (model.getByEmail(email));

module.exports = { getAll, getByEmail };
