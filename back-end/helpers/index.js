const throwError = (error, message) => {
  if (error) {
    throw new Error(message);
  }
}; 

module.exports = {
  throwError,
};