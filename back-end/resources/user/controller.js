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

const create = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await service.create(name, email, password, role);
    res.status(SUCESS).json(user);
  } catch (error) {
    res.status(FAIL);
  }
};

module.exports = { getAll, create };
