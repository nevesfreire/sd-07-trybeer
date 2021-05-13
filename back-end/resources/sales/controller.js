const { StatusCodes } = require('http-status-codes');

const service = require('./service');

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await service.getById(id);
    res.status(StatusCodes.OK).json(sale);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const { error, message } = await service.updateStatus(status, id);
    if (error) return res.status(StatusCodes.BAD_REQUEST).json({ error, message });
    res.status(StatusCodes.OK).json({ message });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = { getById, updateStatus };
