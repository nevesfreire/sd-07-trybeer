const validPassword = (password) => {
  if (!password || password.length < 6) return null;
  return password;
};

module.exports = validPassword;
