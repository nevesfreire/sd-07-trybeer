const { StatusCodes } = require('http-status-codes');

const service = require('./service');

const getAll = async (_req, res) => {
  try {
    const users = await service.getAll();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const create = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const { error, message } = await service.create(name, email, password, role);
    if (error) return res.status(400).json({ message });
    res.status(SUCESS).json({ message });
  } catch (error) {
    res.status(FAIL);
  }
};

module.exports = { getAll, create };
