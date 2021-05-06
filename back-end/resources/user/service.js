const model = require('./model');

const getAll = async () => (model.getAll());

const getByEmail = async (email) => (model.getByEmail(email));

const create = async (name, email, password, role) => (model.create(name, email, password, role));

module.exports = { getAll, getByEmail, create };
