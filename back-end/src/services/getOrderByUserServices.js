const { getOrdersByUser } = require('../models/getOrderByUser');

const getOrderByUserService = async (id) => getOrdersByUser(id);

module.exports = {
    getOrderByUserService,
};