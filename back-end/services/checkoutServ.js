const { getProductsData,
  registerPurchase,
  registerPurchaseProducts } = require('../models/productModels');
const statusMsgMap = require('./dictionaries/statusMsgMap');

const preCheckFields = (requiredFields, inputs) => {
  const missingEntries = requiredFields.find((field) => !Object.keys(inputs).includes(field));
  if (missingEntries) return false;
  return true;
};

const validateSale = (saleData, user) => {
  const mandatoryPdtFields = ['id', 'name', 'price', 'quantity'];
  const mandatoryUserField = ['id'];
  return preCheckFields(mandatoryPdtFields, saleData)
    ? false
    : preCheckFields(mandatoryUserField, user);
};

const insertPurchase = async (purchase, pdtList) => {
  console.log(purchase, pdtList)
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

const formatInfo = (pdts, usr, ttlPrice) => {
  const { deliveryAddress, deliveryNumber, status } = pdts;
  const { id } = usr;
  const date = new Date();
  const trustedDate = `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}`;
  return { userId: id, deliveryAddress, deliveryNumber, status, totalPrice: ttlPrice, trustedDate };
};

const checkoutServ = async (body, user) => {
  try {
    const { cart } = body;
    if (!validateSale(cart, user)) return statusMsgMap.allFieldsMustBeFilled;
    const productsIds = cart.map((p) => p.productId);
    const productsData = await getProductsData(productsIds);
    const totalPrice = productsData
      .reduce((acc, p, i) => acc + (p.price * cart[i].quantity), 0);
    const formatedData = formatInfo(cart, user, totalPrice);
    const { trustedDate } = formatedData;
    console.log('LINE53: ', formatedData, cart)
    const insertionRes = await insertPurchase(formatedData, cart);
    if (!insertionRes) return statusMsgMap.erorInDb;
    const { insertId, statusCode } = insertionRes;
    return { message: { insertId, trustedDate }, status: statusCode };
  } catch (err) {
    console.log('error: ', err);
    return (err);
  }
};

module.exports = checkoutServ;
