
const loginMiddleware = (req, res, next) => {
  
  const REGEX_EMAIL = /^[a-z0-9.]+@[a-z0-9]+\.([a-z]+)$/i;
  const MIN_SIZE = 6;

  const { email, password } = req.body;
  console.log('teste');
  if (!REGEX_EMAIL.test(email) || password < MIN_SIZE) {
    return res.status(400).json({ message: 'Wrong email or password' });
  }
  next();
};

module.exports = { loginMiddleware };
