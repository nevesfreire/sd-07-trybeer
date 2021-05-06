const { saleModel, productModel, userModel } = require('../models');
const { validateData } = require('./validations/SaleValidations');

const errorProduct = { err: { message: 'Produto inexistente' } };
const createSale = async (data, token) => {
  const validateArray = data.map((saleData) => validateData(saleData));
  const dataIsValid = validateArray.some((item) => item.error);
  if (dataIsValid) throw errorProduct;

  const salePrice = await Promise.all(
    data.map(async ({ productName, quantity }) => {
      const product = await productModel.getProductByName(productName);
      const price = (product[0].price * quantity);
      return Number(price);
    }),
  );

  const [userId] = await userModel.getUserEmail(token[0]);
  console.log(userId[0].id);
  const totalSalesValue = salePrice.reduce((acc, curr) => acc + curr);

  // const priceSale = product.price * productDb.quantity;

  // const resultCreateSale = await saleModel.createSale(userId,
  //   priceSale, data[0].deliveryAddress, data[0].deliveryNumber, data[0].status);

  /*     productDB.map(async (product) => {
    saleModel.createSaleProduct(, product.id)
  }); */
};

module.exports = {
  createSale,
};

// createSale, getProductByName
