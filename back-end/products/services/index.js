const model = require('../models');

const validateFieldsProductsSales = async (sale_id, shopCart) => {
  if (!sale_id || !shopCart) throw new Error('Invalid Fields');

  const arrayPromises = shopCart.map((product) => {
    const productsSales = model.createProductsSales(sale_id, product.id, product.qtd);
    if (!productsSales) throw new Error('invalid productsSales');
    return productsSales;
  })

  await Promise.all(arrayPromises);
  return shopCart.map((product) => ({ saleId: sale_id, productId: product.id, productQtd: product.qtd }));
}

const validateFieldsSale = async (idUser, totalProducts, street, houseNumber, status, shopCart) => {
  if (!idUser || !totalProducts || !street || !houseNumber || !status) throw new Error('Invalid Fields');

  const sale = await model.createSale(idUser, totalProducts, street, houseNumber, status);
  // console.log(sale, 'sale');
  if (!sale) throw new Error('invalid sale');

  const result = await validateFieldsProductsSales(sale.insertId, shopCart);
  // console.log(result);
  if (!result) throw new Error('invalid sale');

  return { message: 'Compra realizada com sucesso!', productsSales: result };
}

module.exports = {
  validateFieldsSale,
}
