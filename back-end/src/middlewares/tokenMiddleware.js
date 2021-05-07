const { StatusCodes } = require('http-status-codes'); 
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = 'TRYBEER'

const validateToken = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Token não encontrado' });
    }

    const verifyToken = jwt.verify(authorization, secret);

    if (verifyToken.email !== email) {
      return res.status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Token inválido' });
    }

    next();
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message });
  }
};

module.exports = {
  validateToken,
};
