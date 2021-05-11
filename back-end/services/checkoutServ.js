const { getProductsData,
  registerPurchase,
  registerPurchaseProducts } = require('../models/productModels');
const statusMsgMap = require('./dictionaries/statusMsgMap');

const preCheckFields = (requiredFields, inputs) => {
  const missingEntries = requiredFields.find((field) => !Object.keys(inputs).includes(field));
  if (missingEntries) return false;
  return true;
};

const validateSale = (saleData) => {
  const mandatoryFields = ['userId', 'totalPrice', 'deliveryAddress', 'deliveryNumber'];
  return preCheckFields(mandatoryFields, saleData);
};

const insertPurchase = async (purchase, pdtList) => {
  const [insertPurchRes] = await registerPurchase(purchase);
  if (insertPurchRes.err) return false;
  const { insertId } = insertPurchRes;
  const insertPurchPdtsRes = await registerPurchaseProducts(pdtList, insertId);
  const allInserted = insertPurchPdtsRes
    .find((insertion) => insertion[0].affectedRows !== 1);
  if (insertPurchPdtsRes.err || allInserted) {
    // const deletionRes = await delPurchase(purchase);
    return false;
  }
  return { insertId, statusCode: statusMsgMap.created.status };
};

const getFormatedDate = () => {
  const date = new Date();
  return `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}`;
};

const checkoutServ = async (body, user) => {
  try {
    console.log(user)
    const { sale, productsList } = body;
    if (!validateSale(sale)) return statusMsgMap.allFieldsMustBeFilled;
    const productsIds = productsList.map((p) => p.productId);
    const productsData = await getProductsData(productsIds);
    const totalPrice = productsData
      .reduce((acc, p, i) => acc + (p.price * productsList[i].quantity), 0);
    const { userId, deliveryAddress, deliveryNumber, status } = sale;
    const saleDate = getFormatedDate();
    const trustedSale = { userId, deliveryAddress, deliveryNumber, status, totalPrice, saleDate };
    const insertionRes = await insertPurchase(trustedSale, productsList);
    if (!insertionRes) return statusMsgMap.erorInDb;
    const { insertId, statusCode } = insertionRes;
    return { message: { insertId, saleDate }, status: statusCode };
  } catch (err) {
    console.log('error: ', err);
    return (err);
  }
};

module.exports = checkoutServ;
