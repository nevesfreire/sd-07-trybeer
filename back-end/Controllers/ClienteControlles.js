const {
  resLogin,
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

/* const updateUserName = async (req, res) => {
  const resOK = 200;
  const { name, email, password } = req.body;
  try {
    const nameUserEdited = await nameEdi(name, email);
    res.status(resOK).json(nameUserEdited);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
}; */ 

module.exports = {
  login,
};