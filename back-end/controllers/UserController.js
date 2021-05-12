const { userService } = require('../services');
const { OK, CREATED, NOTMODIFIED, BADREQUEST } = require('./HttpCodes');
const { SAMESTATUS } = require('../services/errors/SaleMessages');

const createUser = async (req, res) => {
  try {
    const data = req.body;
    const userData = await userService.registerUser(data);
    res.status(CREATED).json(userData);
  } catch (error) {
    console.log(error);
    res.status(BADREQUEST).json({ err: { message: error.message } });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    const { email } = req.user[0];
    const response = await userService.updateUser(name, email);
    res.status(OK).json(response);
  } catch (error) {
    let code = BADREQUEST;
    if (error.message === SAMESTATUS.message) code = NOTMODIFIED;
    res.status(code).json({ err: { message: error.message } });
  }
};

module.exports = {
  createUser,
  updateUser,
};