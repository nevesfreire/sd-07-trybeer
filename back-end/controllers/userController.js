const User = require('../services/UserService');

const create = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    const { statusCode, message } = await User.create(name, email, password, role);

    const { user } = await User.findByEmailAndPassword(email, password);

    res.status(statusCode).json({ statusCode, message, user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};
