const usersService = require('../service/usersService');

const findUserByEmail = async (req, res) => {
  // const { email } = req.body;
  // const user = await usersService.findByEmail(email);

  try {
    return res.status(200).json({ message: 'aqui' });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  findUserByEmail,
};
