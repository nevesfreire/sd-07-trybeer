const service = require('./service');

const FAIL = 500;

const getAll = async (req, res) => {
  try {
    const users = await service.getAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(FAIL);
  }
};

module.exports = { getAll };
