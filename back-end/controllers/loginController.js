const User = require('../services/UserService');

module.exports = async (req, res, next) => {
  const { email, password } = req.body;
  console.log('email', email);
  try {
    const { statusCode, user } = await User.findByEmailAndPassword(email, password);
    res.status(statusCode).json({ user, statusCode });
  } catch (error) {
    next(error);
  }
};
