const User = require('../services/UserService');

module.exports = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const { statusCode, user } = await User.findByEmailAndPassword(email, password);
    res.status(statusCode).json(user);
  } catch (error) {
    next(error);
  }

}

// try {
//   const userData = await Models.getByEmailAndPassword(email, password);
//   if (userData) return { token: Auth.generateToken(userData) };
//   throw new Error();
// } catch (err) {
//   throw new CustomError(CODES.UNAUTHORIZED, 'Incorrect username or password');
// }