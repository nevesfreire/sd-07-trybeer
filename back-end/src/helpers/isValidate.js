const { body } = require('express-validator');

const isValidate = () => {
    return (
        body('name').isString().isLength({ min: 12 }),
        body('email').isEmail(),
        body('password').isLength({ min: 6 })
    );
};

module.exports = {
    isValidate
};