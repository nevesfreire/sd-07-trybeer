const service = require('./service');

const SUCESS = 200;
const FAIL = 500;

const getAll = async (req, res) => {
  try {
    const users = await service.getAll();
    res.status(SUCESS).json(users);
  } catch (error) {
    res.status(FAIL);
  }
};

module.exports = { getAll };
