const User = require('../services/UserService');

const create = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    const { statusCode, message } = await User.create(name, email, password, role);
    res.status(statusCode).json({ statusCode, message });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};