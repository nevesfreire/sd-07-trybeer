const model = require('../models');

const validateFieldsProductsSales = async (saleId, shopCart) => {
  if (!saleId || !shopCart) throw new Error('Invalid Fields');

  const arrayPromises = shopCart.map((product) => {
    const productsSales = model.createProductsSales(saleId, product.id, product.qtd);
    if (!productsSales) throw new Error('invalid productsSales');
    
    return productsSales;
  });

  await Promise.all(arrayPromises);
  return shopCart.map((product) => ({ saleId, productId: product.id, productQtd: product.qtd }));
};

const validateFieldsSale = async (newSale, userId) => {
  // if (!idUser || !totalProducts || !street || !houseNumber || !status) throw new Error('Invalid Fields');
  const { totalProducts, street, houseNumber, shopCart } = newSale;
  
  const sale = await model.createSale(userId, totalProducts, street, houseNumber);
  // console.log(sale, 'sale');
  if (!sale) throw new Error('invalid sale');

  const result = await validateFieldsProductsSales(sale.insertId, shopCart);
  // console.log(result);
  if (!result) throw new Error('invalid sale');

  return { message: 'Compra realizada com sucesso!', productsSales: result };
};

module.exports = {
  validateFieldsSale,
};
