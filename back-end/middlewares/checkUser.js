const { allFieldsMustBeFilled } = require('../services/dictionaries/statusMsgMap');

const checkUser = (req, res, next) => {
  const { body } = req;
  const { status, message } = allFieldsMustBeFilled;
  if (!body.name || !body.email || !body.password || !body.isSeller) {
    return res.status(status).json(message);
  }
  return next();
};

module.exports = checkUser;
