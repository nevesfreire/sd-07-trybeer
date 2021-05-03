// const Login = require('../models/Login');


const login = async (req, res) => {
  try {
    // const { email, senha } = req.body;
    const user = req.user;
    console.log(user);
    return res.status(200).json(user);
  } catch (error) {
    console.error(err);
    return res.status(500).json({ message: "error" });
  }
}

module.exports = {
  login,
}
