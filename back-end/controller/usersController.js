const usersService = require('../service/usersService');

const findUserByEmail = async (req, res) => {
  const { email } = req.body;
  const user = await usersService.findByEmail(email);

  try {
    if (user === undefined) {
      return res.status(404).json({ message: 'usuário não encontrado' });
    }
    return res.status(200).json({ message: 'usuário já existe' });
  } catch (error) { return res.status(500).json(error.message); }
};

const createUserController = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    await usersService.createUserService(name, email, password, role);
    res.status(201).json('Criando sucesso!!!');
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateName = async (req, res) => {
  const { name, email } = req.body;
  try {
    await usersService.updateName(name, email);
    res.status(201).json({ message: 'atualizado com sucesso' });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await usersService.findByEmail(email);
  if (user === undefined || user.password !== password) {
    return res.status(404).json({ message: 'usuário ou senha incorreto' });
  }
  const userJWT = { email: user.email, role: user.role };
  const token = usersService.generateToken(userJWT);
  try {
    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token,
      role: user.role,
    });
  } catch (error) { return res.status(500).json(error.message); }
};

module.exports = {
  login,
  findUserByEmail,
  createUserController,
  updateName,
};
