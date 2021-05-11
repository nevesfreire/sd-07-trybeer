const { salesService } = require('../services');
const { permissionDenied } = require('../services/dictionaries/statusMsgMap');

const getAll = async (req, res, next) => {
  try {
    if (req.user.role !== 'administrator') {
      const { status, ...rest } = permissionDenied;
      return res.status(status).json(rest);
    }
    const result = await salesService.getAll();
    if (result.err) return next(result);
    const { status, sales } = result;
    return res.status(status).json(sales);
  } catch (err) {
    console.log(err);
    return next({ err, status: 'internal server error' });
  }
};

module.exports = { getAll };
