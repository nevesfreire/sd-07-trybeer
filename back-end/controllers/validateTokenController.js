const { verifyToken } = require('../helper/AuthValidation');

const validateToken = async (req, _res, next) => {
  const token = req.headers.authorization;

  // const { message } = verifyToken(token);
  // if (message) throw new CustomError(CODE.UNAUTHORIZED, message);
  // res.status(200).json({ statusCode: 200, auth: true });

  try {
    verifyToken(token);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateToken,
};