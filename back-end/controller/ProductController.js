const url = require('url');
const ProductService = require('../service/ProductService');


const getAllProducts = async (req, res) => {
  try {
    const result = await ProductService.getAll();
    const allProducts = result[0].map((product) => ({...product, url_image: url.parse(product.url_image).href}));
    return res.status(200).json(allProducts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllProducts };
