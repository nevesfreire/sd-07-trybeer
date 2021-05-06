const emailIsValid = (email = '') => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const nameisValid = (name = '') => {
  const nameMinLength = 12;
  return name.length >= nameMinLength && /^[a-z ]+$/i.test(name);
};

const passwordIsValid = (password) => password && password.length >= 6;

module.exports = { emailIsValid, passwordIsValid, nameisValid };
