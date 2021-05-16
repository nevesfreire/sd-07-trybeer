const { getProductsData } = require('../models/productModels');
const { registerPurchase, registerPurchaseProducts } = require('../models/salesModels');
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

const formatDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  const hour = String(today.getHours()).padStart(2, '0');
  const minutes = String(today.getMinutes()).padStart(2, '0');
  const seconds = String(today.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
};

const formatInfo = (pdts, { userId, street, houseNumber, totalPrice }) => {
  const { status } = pdts;
  // const date = new Date();
  // const trustedDate = `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}`;
  return {
    userId,
    deliveryAddress: street,
    deliveryNumber: houseNumber,
    status: status || 'Pendente',
    totalPrice,
    trustedDate: formatDate(),
  };
};

const checkoutServ = async (body, user) => {
  try {
    const { cart, street, houseNumber } = body;
    if (!validateSale(cart, user)) return statusMsgMap.allFieldsMustBeFilled;
    const productsIds = cart.map((product) => product.id);
    const productsData = await getProductsData(productsIds);
    const totalPrice = productsData
      .reduce((acc, p, i) => acc + (p.price * cart[i].quantity), 0).toFixed(2);
    const purchInfo = { userId: user.id, street, houseNumber, totalPrice };
    const formatedData = formatInfo(cart, purchInfo);
    const { trustedDate } = formatedData;
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
