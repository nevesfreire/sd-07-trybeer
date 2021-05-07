const productService = require('../services/productService');

const SUCCESS = 200;
const ERRO500 = 500;

const productController = async (req, res) => {
   try {
        const data = await productService.productService(); // melhorar o nome
        res.status(SUCCESS).json(data); 
   } catch (error) {
       res.status(ERRO500).json({ messsage: error.messsage }); // não esta retornando nenhuma mensagem
   }
};

module.exports = {
  productController,
};