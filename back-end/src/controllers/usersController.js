const usersService = require('../services/usersService');

const STATUS_CREATED = 201;
const STATUS_CONFLICT = 409;
const STATUS_BAD_REQUEST = 400;
const STATUS_OK = 200;

const createUser = async (req, res) => {
  const { name, email, password, queroVender } = req.body;

  const result = await usersService.createUser(
    name,
    email,
    password,
    queroVender,
  );

  if (result === 'Invalid entries. Try again.') {
    res.status(STATUS_BAD_REQUEST).json({ message: result });
  } else if (result === 'Já existe um usuário com esse e-mail.') {
    res.status(STATUS_CONFLICT).json({ message: result });
  } else {
    res.status(STATUS_CREATED).json({ user: result });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const result = await usersService.updateUser(id, name);

  if (result === 'Invalid entries. Try again.') {
    res.status(STATUS_BAD_REQUEST).json({ message: result });
  } else {
    res
      .status(STATUS_OK)
      .json({ newName: result, message: 'Atualização concluída com sucesso' });
  }
};

module.exports = { createUser, updateUser };
