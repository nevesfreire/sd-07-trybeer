const connection = require('./connection');
require('dotenv').config();

const savePurchases = async (objSales) => {
  const [sales] = await connection.execute(
    `INSERT INTO Trybeer.sales (
          user_id, total_price, delivery_address, delivery_number, sale_date, status) 
              VALUES ("${objSales.userId}","${objSales.totalPrice}"
              ,"${objSales.deliveryAddress}","${objSales.deliveryNumber}"
              ,CURRENT_DATE() - 1, "${objSales.status}")`,
  );
  return sales;
};

// const savePurchaseAddOn = async (objSales) => {
//   const [sales] = await connection.execute(
//     `INSERT INTO Trybeer.sales_products
//     (sale_id, product_id, quantity) 
//     VALUES ( "${objSales.insert_id}","${objSales.product_id}","${objSales.quantity}" )`,
//   );

//   return sales;
// };

module.exports = {
  savePurchases,
  // savePurchaseAddOn,
};
