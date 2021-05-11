const jwt = require('jsonwebtoken');
const { loginService } = require('../services/login');
const httpStatus = require('./httpStatus');

const secret = 'meusegredoparajwt';

const userLogin = async (req, res) => {
  console.log('entrei no controller');
  
  try {
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const { email, password } = req.body;
    console.log(req.body)
    const token = jwt.sign({ data: email }, secret, jwtConfig);
    const login = await loginService(email, password);
    const loginInfo = {
      name: login.name, role: login.role, email: login.email,
    };
    console.log(loginInfo)
    res.status(httpStatus.OK).json({ ...loginInfo, token });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: 'não deu certo',
    });
  }
};

module.exports = {
  userLogin,
};