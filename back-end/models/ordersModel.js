const connection = require('./connection');

const readAllSales = (sales, products) => {
  const result = sales.map((sale) => {
    const productsGet = products.filter((prod) => prod.id === sale.sale);
    return { sale: { ...sale, products: productsGet } };
  });
  return result;
};

const setProductsInTable = async (product) => {
  const { insertId, productId, quantity } = product;
  const [saleProduct] = await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?,?,?)', 
    [insertId, productId, quantity],
  );
  return saleProduct;
};

const createProductsSale = async (prods) => {
  const { insertId, products } = prods;
  const productsReceived = Object.values(products[0]);
  const result = Promise.all(productsReceived.map(async (cur) => {
    const insertProduct = {
      insertId,
      productId: cur.item.id,
      quantity: cur.quantity,
    };
    const set = await setProductsInTable(insertProduct);
    return { set, result };
  }));
};

const readOneSale = async (id) => {
  const [[sale]] = await connection.query(
    `SELECT u.name AS user, u.id AS userId, s.delivery_address AS address,
     s.id AS sale, s.total_price AS total_price, s.status AS status
      FROM users AS u
      INNER JOIN sales as s
      ON s.user_id = u.id
      WHERE s.id = ?`, [id],
  );
  const [products] = await connection.query(
    `SELECT p.name AS product, p.price AS unit_price, sp.quantity AS quantity, p.url_image AS url
      FROM sales_products AS sp
      INNER JOIN products as p
      ON p.id = sp.product_id
      WHERE sp.sale_id = ?`, [id],
  );
  const result = !sale ? null : { sale: { ...sale, products } };
  return result;
};

const getSales = async () => {
  const [sales] = await connection.query(
    `SELECT u.name AS user, u.id AS userId, s.delivery_address AS address,
     s.delivery_number AS number, s.id AS sale, s.total_price AS total_price,
     s.status AS status
      FROM users AS u
      INNER JOIN sales as s
      ON s.user_id = u.id
      ORDER BY sale`,
  );
  const [products] = await connection.query(
    `SELECT p.name AS product, p.price AS unit_price, sp.quantity AS quantity,
    p.url_image AS url, sp.sale_id as id
      FROM sales_products AS sp
      INNER JOIN products as p
      ON p.id = sp.product_id`,
  );
  const result = await readAllSales(sales, products);
  return result;
};

const getSalesById = async (id) => {
  const result = await readOneSale(id);
  return result;
};

const getSalesByUser = async (user) => {
  const sales = await getSales();
  console.log('Model Sales', sales.sale);
  const result = sales.filter((sale) => sale.sale.userId === Number(user));
  console.log('Model Result: ', result);
  return result;
};

const createSale = async (data) => {
  const {
    userId, totalPrice, deliveryAddress, deliveryNumber, status, products,
  } = data;
    const { saleDate } = data;
    const date = saleDate.split('T').join('-').split('.')[0];
    const [sale] = await connection.execute(
      `INSERT INTO sales (user_id, total_price, delivery_address,
        delivery_number, sale_date, status)
        VALUES (?,?,?,?,?,?)`, 
        [userId, totalPrice, deliveryAddress, deliveryNumber, date, status],
    );
    const { insertId } = Object.assign(sale);
    if (!insertId) return sale;
    const setProductsSale = { insertId, products };
    const prodsSetOnSale = await createProductsSale(setProductsSale);
    return { ...sale, prodsSetOnSale };
};

const changeStatus = async (id) => {
  console.log(`entro models${id}`);
  const [sale] = await connection.execute(
    'UPDATE sales SET status=? WHERE id=?', ['Entregue', id],
        );
    return sale;
};

module.exports = {
  getSales,
  getSalesById,
  getSalesByUser,
  createSale,
  changeStatus,
};
