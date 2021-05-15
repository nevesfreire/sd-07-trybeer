const { getOrderByUserService } = require('../services/getOrderByUserServices');

const SUCESS = 200;

const getOrderByUser = async (req, res) => {
  const { id } = req.body;
  getOrderByUserService(id)
    .then((result) => {
      res.status(SUCESS).json(result);
    })
    .catch((err) => console.log(`error in controller getOrderByUser: ${err} `));
};

module.exports = {
  getOrderByUser,
};
