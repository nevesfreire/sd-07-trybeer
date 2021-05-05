const usersService = require('../service/usersService');

const findUserByEmail = async (req, res) => {
  const { email, password } = req.body;
  const user = await usersService.findByEmail(email);
  if (user === undefined || user.password !== password) {
    return res.status(404).json({ message: 'usuário ou senha incorreto' });
  }
  const userJWT = {
    email: user.email,
    role: user.role,
  };
  const token = usersService.generateToken(userJWT);
  try {
    return res.status(200).json({
      name: user.name,
      email: user.email,
      token,
      role: user.role,
    });
  } catch (error) { return res.status(500).json(error.message); }
};

module.exports = {
  findUserByEmail,
};
