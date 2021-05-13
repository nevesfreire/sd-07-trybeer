const connection = require('./connection');

const querySale = 'INSERT INTO sales (user_id, total_price, delivery_address, delivery_number, '
  + 'sale_date, status) VALUES (?, ?, ?, ?, ?, ?)';

const queryProductSale = 'INSERT INTO sales_products (sale_id, product_id, quantity) '
  + 'VALUES (?, ?, ?)';

const queryGetSaleId = `SELECT sal.id AS "orderNumber",
sal.sale_date AS "orderDate",
sal.total_price AS "totalPrice",
salp.quantity AS "productQuantity",
pro.name AS "productName",
ROUND((pro.price * salp.quantity), 2) AS "totalProductPrice"
FROM Trybeer.sales AS sal
INNER JOIN Trybeer.sales_products AS salp
ON sal.id = salp.sale_id
INNER JOIN Trybeer.products AS pro
ON salp.product_id = pro.id
WHERE sal.id = ?`;

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
  console.log(productsList, saleId);
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

const getAllSalesData = async () => {
  const query = 'SELECT id,sale_date,total_price FROM Trybeer.sales;';
  const [sales] = await connection.execute(query);
  return sales;
};

const getSalesDataById = async (id) => {
  const [orderDetail] = await connection.execute(queryGetSaleId, [id]);
  console.log(orderDetail);
  return orderDetail;
};

module.exports = {
  saleRegister,
  saleProductRegister,
  getProductIdByName,
  getAllSalesData,
  getSalesDataById,
};
