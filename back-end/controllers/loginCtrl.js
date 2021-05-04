const { Router } = require('express');
const { loginServ } = require('../services');

const loginCtrl = Router();

loginCtrl.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const loginRes = await loginServ(body);
    if (loginRes.err) return next(loginRes);
    const { message, status } = loginRes;
    return res.status(status).json(message || { });
  } catch (err) {
    console.log(err);
    return next({ err, status: 'internal server error' });
  }
});

module.exports = loginCtrl;