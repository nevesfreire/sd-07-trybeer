const { StatusCodes } = require('http-status-codes');
const { updateUserName } = require('../services/profileService');

const updateName = async (request, response) => {
  try {
    const { name, email } = request.body;
    await updateUserName(name, email);
    return response.status(StatusCodes.OK)
      .json({ message: 'Atualização concluída com sucesso' });
  } catch (error) {
    return response.status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message });
  }
};

module.exports = { updateName };