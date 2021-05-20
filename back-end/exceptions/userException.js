function userException(message, statusCode) {
  this.message = message;
  this.statusCode = statusCode;
  this.name = 'UserException';
}

module.exports = userException;
