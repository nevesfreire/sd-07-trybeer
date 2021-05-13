const { errors } = require('../helpers');

const ordersListAdmin = (req, resp, next) => {
  const { user: { data: { role } } } = req;
  try {
    if (role !== 'administrator') throw errors.invalidData;
    next();
  } catch (error) {
    next(errors.invalidData);  
  }
};

module.exports = ordersListAdmin;