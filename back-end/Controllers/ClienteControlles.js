const {
  resLogin,
  cadUser,
  nameEdi,
  getProducts,
} = require('../Services/ClienteServices');
const { error1 } = require('../error/index')

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
  try {
    const { newName, newEmail, newPassword, newRole } = req.body;
    const newUser = await cadUser(newName, newEmail, newPassword, newRole);
    return res.status(resOK).json(newUser);
  } catch (err) {
    console.log(err);
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

module.exports = {
  login,
  addUser,
  updateUserName,
  getAllProducts,
};