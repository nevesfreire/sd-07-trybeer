const service = require('./service');

const SUCESS = 200;
const FAIL = 500;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error, message, payload } = await service.login(email, password);
    
    if (error) {
      return res.status(401).json({ message });
    }

    res.status(SUCESS).json({ ...payload });
  } catch (error) {
    res.status(FAIL);
  }
};

module.exports = { login };
