const passwordMinSize = 6;
const nameMinSize = 12;
const contain = {
  numbers: /\d/,
  // REGEX retirado de:
  // https://stackoverflow.com/questions/576196/regular-expression-allow-letters-numbers-and-spaces-with-at-least-one-letter
  notSpecialCharacters: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
};

const validate = {
  email: (email) => {
    // REGEX retirado de:
    // https://stackoverflow.com/questions/52456065/how-to-format-and-validate-email-node-js/52456632
    // https://stackoverflow.com/questions/12317049/how-to-split-a-long-regular-expression-into-multiple-lines-in-javascript
    const emailRegex = new RegExp([
      /^[-!#$%&'*+\\/0-9=?A-Z^_a-z{|}~]/,
      /(\.?[-!#$%&'*+\\/0-9=?A-Z^_a-z`{|}~])*/,
      /@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/,
    ].map((r) => r.source).join(''));

    return emailRegex.test(email);
  },
  password: (password = '', size = passwordMinSize) => password.length >= size,

  name: (name = '') => !contain.numbers.test(name)
    && contain.notSpecialCharacters.test(name)
    && name.length >= nameMinSize,
};

export default validate;
