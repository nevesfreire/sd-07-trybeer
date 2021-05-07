const { saleModel, productModel, userModel } = require('../models');
const { validateData } = require('./validations/SaleValidations');

const createSale = async (data, token) => {
  const validateArray = data.map((saleData) => validateData(saleData));
  const dataIsValid = validateArray.some((item) => item.error);
  if (dataIsValid === true) throw validateArray[0].error.details[0];

  const totalProductPrice = await Promise.all(
    data.map(async ({ productName, quantity }) => {
      const product = await productModel.getProductByName(productName);
      const price = (product[0].price * quantity);
      return Number(price);
    }),
  );

  const [userId] = await userModel.getUserEmail(token[0]);
  const totalSalePrice = totalProductPrice.reduce((acc, curr) => acc + curr);
  const [sale] = await saleModel.createSale(userId[0].id, totalSalePrice, data[0].deliveryAddress, 
    data[0].deliveryNumber);

  data.map(async ({ productName, quantity }) => {
  const [product] = await productModel.getProductByName(productName);
  saleModel.createSaleProduct(sale.insertId, product.id, quantity);
  });
};

module.exports = {
  createSale,
};
