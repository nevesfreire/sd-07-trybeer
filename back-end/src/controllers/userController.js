const userService = require("../services/user");

const updateUser = async (req, res) => {
  const { name, old } = req.body;
  const message= await userService.updateUser(name, old);
  res.status(200).json({ message });
};

module.exports = {
  updateUser,
};
