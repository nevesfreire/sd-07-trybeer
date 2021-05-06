const emailIsValid = (email = '') => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const passwordIsValid = (password) => password && password.length >= 6;

module.exports = { emailIsValid, passwordIsValid };
