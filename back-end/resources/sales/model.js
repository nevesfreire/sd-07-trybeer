const conn = require('../../config/connect');

const getAll = async () => {
  const [sales] = await conn.execute(
    'SELECT * FROM sales;',
  );
  return sales;
};

const getAllByUserId = async (userId) => {
  const [sales] = await conn.execute(
    'SELECT * FROM sales WHERE user_id = ?;',
    [userId],
  );
  return sales;
};

const getById = async (salesId) => {
  const [sales] = await conn.execute(
    'SELECT * FROM sales WHERE id = ?;',
    [salesId],
  );
  return sales;
};

const create = async (sale, products) => {
  const [saleInserted] = await conn.execute(
    `INSERT INTO sales 
    (user_id, total_price, delivery_address, delivery_number, sale_date, status) 
    VALUES (?, ?, ?, ?, NOW(), ?)`, 
    [sale.userId, sale.totalPrice, sale.street, sale.houseNumber, 'Pendente'],
);
  const { insertId } = saleInserted;
  const queryInsertSalesProducts = `INSERT INTO sales_products 
    (sale_id, product_id, quantity) VALUES ? `;
  const queryValues = [];
  products.forEach(({ id, quantity }) => queryValues.push([insertId, id, quantity]));
  
  await conn.query(queryInsertSalesProducts, [queryValues], (err, results, _fields) => {
    if (err) { return console.error(err.message); }
    return results.affectedRows;
  });
};

module.exports = { 
  getAll, 
  getAllByUserId, 
  getById, 
  create,
};

/* 

INSERT INTO sales_products (
    sale_id,
    sale_id,
    product_id,
    product_id,
    quantity
  )
VALUES (
    sale_id:int,
    sale_id:int,
    product_id:int,
    product_id:int,
    'quantity:varchar'
  );

INSERT INTO sales (
    id,
    user_id,
    total_price,
    delivery_address,
    delivery_number,
    sale_date,
    status
  )
VALUES (
    id:int,
    user_id:int,
    'total_price:decimal',
    'delivery_address:varchar',
    'delivery_number:varchar',
    'sale_date:datetime',
    'status:varchar'
  );

    id,
    user_id,
    total_price,
    delivery_address,
    delivery_number,
    sale_date,
    status
*/