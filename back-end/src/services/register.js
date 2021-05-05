const modelRegister = require('../models/Register');

const register = async (name, email, password, checked) => {
    let role = 'admin';
    if (!checked) role = 'cliente';
 
    const user = await modelRegister.register(name, email, password, role);
    return user;
};

module.exports = {
    register,
};