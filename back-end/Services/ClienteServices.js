const ClientModel = require('../Models/ClientModel');
const { error2, error3 } = require('../error/index');

const resLogin = async (email, password) => {
  const userOK = await ClientModel.getEmailUser(email, password);
  if (!userOK || userOK.email !== email) throw error2;
  return ClientModel.token(userOK);
};

const cadUser = async (newName, newEmail, newPassword, newRole) => {
  const userOK = await ClientModel.getEmailUser(newEmail, newPassword);
  console.log(userOK);
  if (userOK) return error3.message;
  return ClientModel.newUser(newName, newEmail, newPassword, newRole);
};

const nameEdi = async (name, email) => {
  const userLocalizado = await ClientModel.getUserForName(name, email);
  if (!userLocalizado) throw error2;
  return ClientModel.editName(name, email);
};

const getProducts = async () => ClientModel.allProducts();

const savSale = async (userId,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  products) => ClientModel.saveSales(
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    products);

const salesAll = async (id) => ClientModel.salesA( id );

module.exports = {
  resLogin,
  cadUser,
  nameEdi,
  getProducts,
  savSale,
  salesAll,
};