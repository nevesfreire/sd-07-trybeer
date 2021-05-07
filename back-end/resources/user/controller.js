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
    const { error, message } = await service.create(name, email, password, role);
    if (error) return res.status(400).json({ message });
    res.status(SUCESS).json({ message });
  } catch (error) {
    res.status(FAIL);
  }
};

module.exports = { getAll, create };
