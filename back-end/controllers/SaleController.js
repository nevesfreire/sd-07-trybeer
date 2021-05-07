const { saleService } = require('../services');

const createSale = async (req, res) => {
  try {
    const { body, user } = req;
    await saleService.createSale(body, user);
    res.status(200).json({ message: 'Compra realizada com sucesso!' });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

const getSaleByUserId = async (req, res) => {
  try {
    const { id } = req.user[0];
    const sales = await saleService.getSaleByUserId(id);
    res.status(200).json(sales);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getSaleProducts = async (req, res) => {
  try {
    const { id } = req.user[0];
    const { saleid } = req.params;
    const prouctSale = await saleService.getSaleProducts(id, saleid);
    res.status(200).json(prouctSale);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  createSale,
  getSaleByUserId,
  getSaleProducts,
};