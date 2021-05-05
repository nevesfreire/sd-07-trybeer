const model = require('../models');

const validateUserId = async (id) => {
  const user = await model.getById(id);
  if (!user) throw new Error('user not Exists');
  return user;
};

module.exports = {
  validateUserId,
};
