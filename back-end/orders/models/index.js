const conn = require('../../models/connection');

const getAll = async () => {
  const query = 'SELECT * FROM sales;';
  const [data] = await conn.execute(query);
  return data;
};

const getAllSalesProducts = async () => {
  const query = 'SELECT * FROM sales_products;';
  const [data] = await conn.execute(query);
  return data;
};

const getOrder = async (id) => {
  const query = 'SELECT * FROM Trybeer.sales S'
  + ' INNER JOIN Trybeer.sales_products SP ON SP.sale_id = S.id'
  + ' INNER JOIN Trybeer.products P ON P.id = SP.product_id'
  + ' Where S.id = ?;';
  const [data] = await conn.execute(query, [id]);
  return data;
};

const updateStatus = async (id) => {
  const status = 'Entregue';
  const query = 'UPDATE Trybeer.sales S SET status = ?'
  + ' Where S.id = ?;';
  await conn.execute(query, [status, id]);
  return { status };
}

module.exports = {
  getAll,
  getAllSalesProducts,
  getOrder,
  updateStatus
};