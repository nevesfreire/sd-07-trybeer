const { StatusCodes } = require('http-status-codes');
const { service } = require('../resources/auth');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (token === undefined) {
        return res.status(StatusCodes.UNAUTHORIZED).send();
    }

    if (service.tokenIsValid(token)) {
        return next();
    }

    return res.status(StatusCodes.UNAUTHORIZED).send();
};

module.exports = authMiddleware;