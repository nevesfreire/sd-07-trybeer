const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await userService.createUser(name, email, password, role);
    res.status(201).json(newUser);
  } catch (error) {
    const { message, code } = error;
    if (code) {
      return res.status(code).json({
        message,
      });
    }
    return res.status(500).json({
      message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login(email, password);
    res.status(200).json(user);
  } catch (error) {
    const { message, code } = error;
    if (code) {
      return res.status(code).json({
        message,
      });
    }
    return res.status(500).json({
      message,
    });
  }
};

const editUser = async (req, res) => {
  try {
    const {name} = req.body;
    const {id} = req.user;
    const result = await userService.validateNewName(name, id);
    res.status(200).json({message: result});
  } catch (error) {
    const { message, code } = error;
    if (code) {
      return res.status(code).json({
        message,
      });
    }
    return res.status(500).json({
      message,
    });
  }
}

module.exports = { 
  createUser,
  login,
  editUser,
};
