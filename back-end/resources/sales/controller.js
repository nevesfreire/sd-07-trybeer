const { StatusCodes } = require('http-status-codes');

const service = require('./service');

const update = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const { error, message } = await service.update(status, id);
    if (error) return res.status(StatusCodes.BAD_REQUEST).json({ error, message });
    res.status(StatusCodes.OK).json({ message });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = { update };
