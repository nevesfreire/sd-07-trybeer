const JWT = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const model = require('../users/models');

const { SECRET } = process.env || 'grupo09';

const validateCreateLoginToken = async (userEmail) => {
  const user = await model.getByEmail(userEmail);
  if (!user) {
    throw new Error('User not found');
  }
  const userCopy = { ...user };
  delete userCopy.password;

  const jwtConfig = {
    expiresIn: 60 * 5,
    algorithm: 'HS256',
  };

  // name, email e role
  const token = JWT.sign({ ...userCopy }, SECRET, jwtConfig);

  const userCopy2 = { ...userCopy };
  delete userCopy2.id;

  return { ...userCopy2, token };
};

const validateToken = (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error('missing auth token');

    const decodedJWT = JWT.verify(authorization, SECRET);
    if (!decodedJWT) throw new Error('jwt malformed');

    const { id, role } = decodedJWT;
    req.userId = id;
    req.userRole = role;
    next();
  } catch (error) {
    next({
      status: StatusCodes.UNAUTHORIZED,
      message: error.message,
    });
  }
};

// const validateUserAuthorization = async (req, _res, next) => {
//   try {
//     const { id } = req.params;
//     const { userId, userRole } = req;
//     throwError(!ObjectID.isValid(id) || !ObjectID.isValid(userId), null,
//       { status: NOT_FOUND, message: 'id Invalid' });
//     const user = await usersModel.readById(userId);
//     throwError(!user, 'userId did not registered', null);
//     const recipe = await recipesModel.readById(id);
//     throwError(!recipe, 'recipe did not registered', null);
//     throwError(recipe.userId !== userId && userRole === 'user', 'user is not admin', null);
//     next();
//   } catch (error) {
//     if (error.code) {
//       return next({ status: error.code.status, message: error.code.message });
//     }
//     next({ status: UNAUTHORIZED, message: error.message });
//   }
// };

module.exports = {
  validateCreateLoginToken,
  validateToken,
};
