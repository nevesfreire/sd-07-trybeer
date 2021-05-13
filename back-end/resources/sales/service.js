const model = require('./model');
const { statusIsValid } = require('../../helpers/validations');

const updateStatus = async (status, id) => {
  if (!statusIsValid(status)) return { error: true, message: 'dados inválidos' };
  await model.updateStatus(status, id);
  return { error: false, message: 'Status do pedido atualizado.' };
};

module.exports = { updateStatus };