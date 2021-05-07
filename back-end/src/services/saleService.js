const saleModel = require('../models/saleModel');

const createSale = async (userId, totalPrice, products, address) => {
  const { street, number } = address;
  const formatedTotalPrice = Number(totalPrice.replace(',', '.'));
  const newSaleId = await saleModel.createSale(userId, formatedTotalPrice, street, number);

  // for (const product of products) {
  //   const { id: productId, quantity } = product;
  // }

  const productsSaled = products.map(({ id, quantity }) => [newSaleId, id, quantity]);
  console.log(productsSaled);
  await saleModel.createSaleProducts(productsSaled);
};

module.exports = { 
  createSale,
};