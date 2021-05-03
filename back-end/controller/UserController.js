// POST USER Criaçao usuario
const UserService = require('../service/UserService');

const create = async (req, res) => {
  const { name, email, role, password } = req.body;
  const { newUser, message, status } = await UserService.create(name, email, role, password);

  if (message) { return res.status(status).send(message); }
  return res.status(status).send(newUser);
};

module.exports = { create };

// {
//   "name": "Taylor Swift",
//   "email": "taylorswift@email.com",
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4(...)",
//   "role": "client"
// }