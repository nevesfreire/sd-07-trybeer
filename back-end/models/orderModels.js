const connection = require('./connection');

const getOrdersUser = async (idUser) => {
  const [result] = await connection.execute('SELECT * FROM sales WHERE user_id=?', [idUser]);
  return result;
};

const getOrdersAdmin = async () => {
  const [result] = await connection.execute('SELECT * FROM sales');
  return result;
};

const getOrderDetails = async (id) => {
  const [result] = await connection.execute('SELECT s.id AS sale_number, s.status AS status,  s.sale_date AS sale_date, sp.quantity AS quantity, p.name AS product_name, p.price AS  price FROM Trybeer.sales AS s INNER JOIN Trybeer.sales_products AS sp ON s.id = sp.sale_id INNER JOIN Trybeer.products AS p ON p.id = sp.product_id WHERE s.id=?', [id]);
  return {
    order: {
      sale_number: result[0].sale_number,
      status: result[0].status,
      sale_date: result[0].sale_date,
    },
    products: 
      result.map((product) => {
        return {
          name: product.product_name,
          quantity: product.quantity,
          price: product.price,
        }       
      })
  };
};

const changeStatus = async (id, situation) => {
  // const tag = 'Entregue';
  const [result] = await connection.execute('UPDATE sales SET status=? WHERE id=?',
    [situation, id]);
  console.log(result);
};

module.exports = {
  getOrdersUser,
  getOrdersAdmin,
  getOrderDetails,
  changeStatus,
};
