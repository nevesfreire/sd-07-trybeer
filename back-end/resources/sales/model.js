const conn = require('../../config/connect');

const getById = async (id) => {  
  const [[sale]] = await conn.execute(
    'SELECT * FROM sales WHERE sales.id = ?;', [id],
  );  
  return sale;
};

/* SELECT sp.quantity AS "qtd",
p.name AS "name",
p.price AS "unitPrice"
FROM products AS p
INNER JOIN sales_products AS sp ON p.id = sp.product_id
INNER JOIN sales AS s ON s.id = sp.sale_id
WHERE s.id = ?;
*/

const updateStatus = async (status, id) => conn.execute(
  'update sales SET status = ? WHERE id = ?', [status, id],
);

module.exports = { getById, updateStatus };
