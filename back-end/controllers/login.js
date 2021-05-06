const jwt = require('jsonwebtoken');
const { loginService } = require('../services/login');
const httpStatus = require('./httpStatus');

const secret = 'meusegredoparajwt';

const userLogin = async (req, res) => {
  try {
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const { email, password } = req.body;
    const token = jwt.sign({ data: email }, secret, jwtConfig);
    const login = await loginService(email, password);
    console.log(login);
    res.status(httpStatus.OK).json({ token });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: 'não deu certo',
    });
  }
};

module.exports = {
  userLogin,
};