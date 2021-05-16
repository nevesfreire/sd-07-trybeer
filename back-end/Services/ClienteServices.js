const ClientModel = require('../Models/ClientModel');

const { error2, error3 } = require('../error/index');

const resLogin = async (email, password) => {
  const userOK = await ClientModel.getEmailUser(email, password);
  if (!userOK || userOK.email !== email) throw error2;
  return ClientModel.token(userOK);
};

const cadUser = async (newName, newEmail, newPassword, newRole) => {

  const userOK = await ClientModel.getEmailUser(newEmail, newPassword);
  console.log('passou 5')
  if (userOK) return error3.message;
  console.log('passou 6')
  return ClientModel.newUser(newName, newEmail, newPassword, newRole);
};

const nameEdi = async (name, email) => {
  const userLocalizado = await ClientModel.getUserForName(name, email);
  if (!userLocalizado) throw error2;
  return ClientModel.editName(name, email);
};

const getProducts = async () => ClientModel.allProducts();

const savSale = async (infoUser, totalPrice, products) => {
  await ClientModel.saveSales(
    infoUser,
    totalPrice,
    products,
  );
}

const salesAll = async (id) => ClientModel.salesA(id);

const saleDetail = async (id) => ClientModel.detSales(id);

const getAdmSales = async () => ClientModel.allSalesAdm();

const finallyO = async (id) => ClientModel.orderFinal(id);

module.exports = {
  resLogin,
  cadUser,
  nameEdi,
  getProducts,
  savSale,
  salesAll,
  saleDetail,
  getAdmSales,
  finallyO,
};