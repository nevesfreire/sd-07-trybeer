const { saleModel, productModel, userModel } = require('../models');
const { 
  SAMESTATUS,
  NOTFOUNDID,
  NOEXISTENTPURCHASE,
  NOTADMINISTRATOR,
  NOEXISTENTSALE,
} = require('./errors/SaleMessages');
const { validateData, validateStatus } = require('./validations/SaleValidations');

const createSale = async (data, token) => {
  const validateArray = data.map((saleData) => validateData(saleData));
  const dataIsntValid = validateArray.some((item) => item.error);
  if (dataIsntValid === true) throw validateArray.find((error) => error.error).error.details[0];
  
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
  if (sales.length === 0) throw NOTFOUNDID;
  return sales;
};

const getSaleByUserId = async (id) => {
  const result = await saleModel.getSaleByUserId(id);
  if (result.length === 0) throw NOEXISTENTPURCHASE;
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

const getAllSales = async (token) => {
  if (token[0].role !== 'administrator') throw NOTADMINISTRATOR;
  const [sales] = await saleModel.getAllSales();
  if (sales.length === 0) throw NOEXISTENTSALE;
  return sales;
};

const updateSaleStatus = async (id, status, token) => {
  const { error } = validateStatus(status);
  if (token[0].role !== 'administrator') throw NOTADMINISTRATOR;
  if (error) throw error;
  const [response] = await saleModel.updateSaleStatus(id, status);
  if (response.changedRows === 0) throw SAMESTATUS;
  return { message: `Pedido registrado como ${status}` };
};

module.exports = {
  createSale,
  getSaleByUserId,
  getSaleProducts,
  getAllSales,
  updateSaleStatus,
};
