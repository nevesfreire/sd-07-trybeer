const userService = require("../services/user");

const updateUser = async (req, res) => {
  const { name, old } = req.body;
  const update = await userService(name, old);
  res.status(200).json({ update });
};

module.exports = {
  updateUser,
};
