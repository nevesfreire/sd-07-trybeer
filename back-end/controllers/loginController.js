const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const generateToken = (result, jwtConfig) => {
  const { email, role, id } = result;
  const token = jwt.sign({ email, role, id }, process.env.REACT_APP_SECRET 
    || process.env.SECRET, jwtConfig);
  return token;
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [result] = await loginService.validations(email, password);
    if (result) {
      const jwtConfig = {
        expiresIn: 60 * 60,
        algorithm: 'HS256',
      };
      const token = generateToken(result, jwtConfig);
      const { name, role, id } = result;
      return res.status(200).json({ name, email, token, role, id });
    }
  } catch (error) {
    const { message } = error;
    return res.status(401).json({ message });
  }
};

module.exports = {
  login,
};
