const model = require('./model');
const { statusIsValid } = require('../../helpers/validations');

const update = async (status, id) => {
  if (!statusIsValid(status)) return { error: true, message: 'dados inválidos' };
  await model.update(status, id);
  return { error: false, message: 'Status do pedido atualizado.' };
};

module.exports = { update };