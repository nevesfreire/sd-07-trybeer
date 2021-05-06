const { Router } = require('express');
const { checkoutServ } = require('../services');

const checkoutCtrl = Router();

checkoutCtrl.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const checkoutRes = await registerPurchase(body);
  }
})