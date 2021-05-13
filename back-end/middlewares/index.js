const errorMiddleware = require('./errorMiddleware');
const authMiddleware = require('./authMiddleware');
const ordersListAdmin = require('./ordersListAdmin');

module.exports = {
  errorMiddleware,
  authMiddleware,
  ordersListAdmin,
};
