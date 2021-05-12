const connection = require('./connection');

const querySale = 'INSERT INTO sales (user_id, total_price, delivery_address, delivery_number, '
  + 'sale_date, status) VALUES (?, ?, ?, ?, ?, ?)';

const queryProductSale = 'INSERT INTO sales_products (sale_id, product_id, quantity) '
  + 'VALUES (?, ?, ?)';

const saleRegister = async ({
  id,
  price,
  address,
  deliveryNumber,
  saleDate,
  salesStatus,
}) => {
  const registeredSale = await connection.execute(querySale, [
    id,
    price,
    address,
    deliveryNumber,
    saleDate,
    salesStatus,
  ]);
  console.log(registeredSale);
  return registeredSale[0];
};

const getProductIdByName = async (productsList) => {
  const queryProduct = 'SELECT id FROM Trybeer.products WHERE name = ?';
  const productsIdList = await Promise.all(
    productsList.map(async (product) => {
      const [productId] = await connection.execute(queryProduct, [
        product.productName,
      ]);
      return productId;
    }),
  );
  return productsIdList.map((element) => {
    const [id] = element;
    return id;
  });
};

const saleProductRegister = async (productsList, saleId) => {
  console.log(productsList, saleId)
  const productIdList = await getProductIdByName(productsList);
  await Promise.all(
    productsList.map(async (product, i) => {
      await connection.execute(queryProductSale, [
        saleId,
        productIdList[i].id,
        product.quantity,
      ]);
    }),
  );
  return true;
};

module.exports = {
  saleRegister,
  saleProductRegister,
  getProductIdByName,
};
