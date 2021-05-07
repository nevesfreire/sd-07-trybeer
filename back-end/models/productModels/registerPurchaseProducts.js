const connection = require('../connection');

const registerPurchaseProducts = async (productsList, saleId) => {
  const response = productsList.map((pdt) => connection
    .execute('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES(?,?,?)',
    [saleId, pdt.product_id, pdt.quantity]));

  const pdtsList = await Promise.all(response)
    .then((resp) => resp.map((e) => e[0][0]));
  return pdtsList;
};

export default registerPurchaseProducts;