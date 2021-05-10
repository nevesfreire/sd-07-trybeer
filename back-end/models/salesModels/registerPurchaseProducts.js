const connection = require('../connection');

const registerPurchaseProducts = async (productsList, saleId) => {
  try {
    const response = productsList.map((pdt) => connection
      .execute('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES(?,?,?)',
      [saleId, pdt.productId, pdt.quantity]));
  
    const pdtsList = await Promise.all(response)
      .then((resp) => resp.map((e) => e))
      .catch((err) => err);
    return pdtsList;
  } catch (err) {
    console.log('registerPurchasePRODUCTS: ', err);
    return err;
  }
};

module.exports = registerPurchaseProducts;