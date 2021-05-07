const { saleModel, productModel, userModel } = require('../models');
const { validateData } = require('./validations/SaleValidations');

const ERRORID = { err: 'Não foram encontradas compras com esse id' };
const ERROR = { err: 'Usuário ainda não realizou nenhuma compra' };
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

const getSaleProducts = async (id, saleid) => {
  const sales = await saleModel.getSaleById(id, saleid);
  if (sales.length === 0) throw ERRORID;
  return sales;
};

const getSaleByUserId = async (id) => {
  const result = await saleModel.getSaleByUserId(id);
  if (result.length === 0) throw ERROR;
  const retorno = await Promise.all(result.map((sale) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const saleDate = sale.sale_date.toLocaleString('en-GB', options);
    return {
      saleId: sale.id,
      saleDate: saleDate.slice(0, 5),
      totalPrice: sale.total_price,
    };
  }));
  return retorno;
};

module.exports = {
  createSale,
  getSaleByUserId,
  getSaleProducts,
};
