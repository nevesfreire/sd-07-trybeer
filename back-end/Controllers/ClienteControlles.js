const {
  resLogin,
  cadUser,
  nameEdi,
  getProducts,
  savSale,
  salesAll,
  saleDetail,
  getAdmSales,
  finallyO,
} = require('../Services/ClienteServices');
const { error1 } = require('../error/index');

const login = async (req, res) => {
  const resOK = 200;
  try {
    const { email, password } = req.body;
    if (!email || !password) throw error1;
    const loginOk = await resLogin(email, password);
    return res.status(resOK).json(loginOk);
  } catch (err) {
    res.status(err.code || 401).json({ message: err.message });
  }
};

const addUser = async (req, res) => {
  const resOK = 201;
  console.log('passou 1');
  try {
    const { newName, newEmail, newPassword, newRole } = req.body;
    console.log('passou 3')
    const newUser = await cadUser(newName, newEmail, newPassword, newRole);
    console.log('passou 4')
    return res.status(resOK).json(newUser);
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
};

const updateUserName = async (req, res) => {
  const resOK = 200;
  const { name, email } = req.body;
  try {
    const nameUserEdited = await nameEdi(name, email);
    res.status(resOK).json(nameUserEdited);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  const resOK = 200;
  try {
    const searchRecipe = await getProducts();
    res.status(resOK).json(searchRecipe);
  } catch (err) {
    res.status(err.code).json({
      message: err.message,
    });
  }
};

const saleSave = async (req, res) => {
  const resOK = 200;
  const { infoUser, totalPrice, products } = req.body;

  try {
    const cadSale = await savSale(infoUser, totalPrice, products);
    res.status(resOK).json(cadSale);
  } catch (err) {
    res.status(400).send('Erro ao adicionar venda de Checkout na tabela Vendas');
  }
};

const sales = async (req, res) => {
  const resOK = 200;
  const { id } = req.body;

  try {
    const allSales = await salesAll(id);
    res.status(resOK).json(allSales);
  } catch (err) {
    res.status(err.code).json({
      message: err.message,
    });
  }
};

const detailSale = async (req, res) => {
  const resOK = 200;
  const { id } = req.params;

  try {
    const detSale = await saleDetail(id);
    res.status(resOK).json(detSale);
  } catch (err) {
    res.status(err.code).json({
      message: err.message,
    });
  }
};

const salesAdm = async (req, res) => {
  const resOK = 200;
  try {
    const salesadm = await getAdmSales();
    res.status(resOK).json(salesadm);
  } catch (err) {
    res.status(err.code).json({
      message: err.message,
    });
  }
};

const updateStatus = async (req, res) => {
  const resOK = 200;
  const { id } = req.params;

  try {
    const finallyOrder = await finallyO(id);
    res.status(resOK).json(finallyOrder);
  } catch (err) {
    res.status(err.code).json({
      message: err.message,
    });
  }
};

module.exports = {
  login,
  addUser,
  updateUserName,
  getAllProducts,
  saleSave,
  sales,
  detailSale,
  salesAdm,
  updateStatus,
};