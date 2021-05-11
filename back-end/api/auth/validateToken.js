const jwt = require('jsonwebtoken');
const { StatusCodes: { UNAUTHORIZED, OK } } = require('http-status-codes');

const secret = process.env.SECRET_JWT || 'trybeer';

const validateToken = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado ou informado' });
  }

  try {
    const verifyJWT = jwt.verify(token, secret);
    return res.status(OK).json({ message: verifyJWT });
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: error.message });
  }
};

module.exports = validateToken;
