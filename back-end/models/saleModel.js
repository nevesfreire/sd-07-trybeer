const connection = require('./connection');

const getAllSales = async () => {
  const [allRows] = await connection.execute('SELECT * FROM sales');
  return allRows;
};

const getSaleById = async (id) => {
  const [row] = await connection.execute('SELECT * FROM sale WHERE id = ?', [
    id,
  ]);
  return row;
};

const createCheckout = async (ObjParams) => {
  const { userId, totalPrice, deliveryAddress, deliveryNumber, cart } = ObjParams;
  const [checkout] = await connection.execute(
    'INSERT INTO sales'
    + '(user_id, total_price, delivery_address, delivery_number, sale_date, status)'
    + 'VALUES (?, ?, ?, ?, now(), "Pendente")',
    [userId, totalPrice, deliveryAddress, deliveryNumber],
  );
    cart.map(sale => {
      connection.execute(
        'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
        [checkout.insertId, sale[0], sale[2]],
      );
    })
  return { message: 'Pedido Enviado', checkout };
};

module.exports = {
  createCheckout,
  getAllSales,
  getSaleById,
};
