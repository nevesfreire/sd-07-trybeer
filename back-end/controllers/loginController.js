const loginService = require('../services/loginService');
const jwt = require('jsonwebtoken');

const secret = 'segredo'

const generateToken = (result, jwtConfig) => {
  const { email, role, id } = result
  const token = jwt.sign({ email, role, id }, jwtConfig, secret)
  return token;
}

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await loginService.validations(email, password)
    if(result) {
      const jwtConfig = {
        expiresIn: 60 * 60,
        algorithm: 'HS256'
      }
    }
    const token = generateToken(result, jwtConfig)
    const { name, role } = result
    return res.status(200).json({name, email, token, role}) 
  } catch (error) {
    const { message } = error;
    return res.status(401).json({message})
  }
}

module.exports = {
  login,
}