const jwt = require('jsonwebtoken');

const secret = 'umasenhaqualquer';

const myMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  const { data: { id } } = jwt.verify(token, secret);
  // console.log(jwt.verify(token, secret));
  if (!id) {
  return res.status(401).json({ 
  message: 'Jwt malformed',
  }); 
  }
  req.body.id = id;
  next();
}; 

module.exports = myMiddleware;