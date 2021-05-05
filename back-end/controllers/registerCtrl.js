const registerServ = require('../services/registerServ');

const registerCtrl = async (req, res, next) => {
  try {
    const { body } = req;
    const loginRes = await registerServ(body);
    if (loginRes.err) return next(loginRes);
    const { message, status } = loginRes;
    return res.status(status).json(message || {});
  } catch (err) {
    console.log(err);
    return next({ err, status: 'Internal server error' });
  }
};

module.exports = registerCtrl;