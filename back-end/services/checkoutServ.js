const { getProductsData,
  registerPurchase,
  registerPurchaseProducts } = require('../models/productModels');
const statusMsgMap = require('./dictionaries/statusMsgMap');

const preCheckFields = (requiredFields, inputs) => {
  const correctEntries = requiredFields.find((field) => !Object.keys(inputs).includes(field));
  if (!correctEntries) return false;
  return true;
};

const validateSale = (saleData) => {
  const mandatoryFields = ['userId', 'totalPrice', 'deliveryAddress', 'deliveryNumber'];
  return preCheckFields(mandatoryFields, saleData);
};

const insertPurchase = async (purchase, pdtList) => {
  const insertPurchRes = await registerPurchase(purchase);
  if (insertPurchRes.err) return false;
  const insertPurchPdtsRes = await registerPurchaseProducts(pdtList, insertPurchRes.id);
  if (insertPurchPdtsRes.err) {
    // const deletionRes = await delPurchase(purchase);
    return false;
  }
  const { id, date } = insertPurchRes;
  return { id, date };
};

const checkoutServ = async (body) => {
  try {
    const { sale, productsList } = body;
    if (!validateSale(sale)) return statusMsgMap.allFieldsMustBeFilled;
    const productsIds = productsList.map((p) => p.productId);
    const productsData = await getProductsData(productsIds);
    const price = productsData
      .reduce((acc, pr, i) => acc + (pr.price * productsList[i].quantity), 0);
    const { userId, deliveryAddress, deliveryNumber, status } = sale;
    const trustedSale = { userId, deliveryAddress, deliveryNumber, status, price };
    
    const insertionRes = insertPurchase(trustedSale, productsList);
    if (!insertionRes) return statusMsgMap.erorInDb;
    return { status: statusMsgMap.created, message: insertionRes };
  } catch (err) {
    console.log('error: ', err);
    return (err);
  }
};

module.exports = {
  checkoutServ,
};

// sales (
//   user_id 
//   total_price 
//   delivery_address 
//   delivery_number 
//   sale_date 
//   status

// sales_products (
//   product_id
//   quantity
//   PRIMARY KEY(sale_id, product_id),

//   FOREIGN KEY(sale_id) REFERENCES sales(id),
//   FOREIGN KEY(product_id) REFERENCES products(id)