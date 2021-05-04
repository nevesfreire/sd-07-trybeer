const validEmail = (email) => {
  const REGEX = /\S+@\S+\.\S+/;
  return REGEX.test(email);
};

module.exports = validEmail;
