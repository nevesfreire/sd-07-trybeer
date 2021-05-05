const {
  resLogin
} = require('../Services/ClienteServices');

const login = async (req, res) => {
  const resOK = 200;
  try {
    const { email, password } = req.body;
    if (!email || !password) throw { message: "email or password is invalid"};
    const loginOk = await resLogin(email, password);
    return res.status(resOK).json( loginOk );
  } catch (err) {
    res.status(err.code || 401).json({ message: err.message });
  }
};

module.exports = {
  login,
}