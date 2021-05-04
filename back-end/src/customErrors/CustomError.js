// Fonte
// https://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript

function CustomError(message, code) {
  this.message = message;
  this.stack = Error().stack;
  this.code = code;
}

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.name = 'CustomError';

module.exports = CustomError;
