const jwt = require('jsonwebtoken');
const connect = require('../config/connection');

const getEmailUser = async (email, password) => {
  const [data] = await connect
    .execute(`SELECT id, name, email, password, role
    FROM Trybeer.users
    WHERE email = ? AND password = ?`, [email, password]);

  console.log(data.length);
  if (!data.length) return null;

  return {
    name: data[0].name,
    email: data[0].email,
    role: data[0].role,
    id: data[0].id,
  };
};

const getUserForName = async (name, email) => {
  const user = await connect
  .execute(`SELECT name, email FROM Trybeer.users
  WHERE name = ? AND email = ?`, [name, email]);

  return {
    name: user[0].name,
    email: user[0].email,
  };
};

const secret = 'umasenhaqualquer';

const jwtConfig = { expiresIn: '3d', algorithm: 'HS256' };

const token = (user) => {
  const objToken = { id: user.id, name: user.name, email: user.email, role: user.role };

  const myToken = jwt.sign({ data: objToken }, secret, jwtConfig);
  const result = {
    user: objToken,
    token: myToken,
  };
  return result;
};

const newUser = async (newName, newEmail, newPassword, newRole) => {
  await connect
  .execute(`INSERT INTO users ( name, email, password, role) VALUES
  (?, ?, ?, ?)`, [newName, newEmail, newPassword, newRole]);

  return { code: 200, message: 'usuario cadastrado com sucesso', newRole };
};

const editName = async (name, email) => {
   await connect
  .execute('UPDATE users SET name = ? WHERE email = ?', [name, email]);

  return {
    name,
    message: 'Atualização concluída com sucesso',
    status: 200,
  };
};

const allProducts = async () => {
  const aProducts = [];
  const [products] = await connect
  .execute('SELECT * FROM Trybeer.products');

  products.forEach((product) => aProducts.push(product));
  console.log(aProducts);

  return aProducts;
};

async function saveSales(infoUser, totalPrice, products) {
  const saleCad = await connect
  .execute(`
  INSERT INTO sales
  ( user_id,
    total_price,
    delivery_address,
    delivery_number,
    sale_date, status) VALUES
    (?, ?, ?, ?, now(), 'pendente')`, [infoUser.userId,
      totalPrice,
      infoUser.deliveryAddress,
      infoUser.deliveryNumber]);

  const saleId = saleCad[0].insertId;
  const result = await connect
  .query('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES ?',
    [products.map((product) => [saleId, product.id, product.quantity])]);

    const obj = {
      saleId: saleId,
      products: products,
      userId: infoUser.userId,
    }
  return (obj);
}

const salesA = async (id) => {
  const [sales] = await connect
  .execute(`select * from Trybeer.sales
  where user_id = ?`, [id]);

  return sales;
};

module.exports = {
  getEmailUser,
  token,
  newUser,
  getUserForName,
  editName,
  allProducts,
  saveSales,
  salesA,
};
