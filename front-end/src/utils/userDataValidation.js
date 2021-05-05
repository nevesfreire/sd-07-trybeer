const passwordMinSize = 6;
const nameMinSize = 12;
const contain = {
  numbers: /\d/,
  specialCharacters: /[^a-zA-Z 0-9]+/g,
  twelveCharacters: /[a-z]{12}/i,
};

const validate = {
  email: (email) => {
    const emailValidate = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
    return emailValidate.test(email);
  },
  password: (password = '', size = passwordMinSize) => password.length >= size,

  name: (name = '') => !contain.numbers.test(name)
    && !contain.specialCharacters.test(name)
    && name.replaceAll(' ', '').length > nameMinSize,
};

export default validate;
