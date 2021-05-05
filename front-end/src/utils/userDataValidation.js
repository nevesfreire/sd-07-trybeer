const SIX = 6;
const twelve = 12;
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
  password: (password = '', size = SIX) => password.length >= size,

  name: (name = '') => !contain.numbers.test(name)
    && !contain.specialCharacters.test(name)
    && name.replaceAll(' ', '').length > twelve,
};

export default validate;
