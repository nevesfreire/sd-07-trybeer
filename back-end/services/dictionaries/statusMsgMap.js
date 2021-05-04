const statusMsgMap = {
  'all fields must be filled': {
    status: 401, message: 'All fields must be filled', error: true,
  },
  'authMiddleware error': {
    status: 401, message: 'jwt malformed', error: true,
  },
  created: {
    status: 201,
  },
  'db search returned empty': {
    status: 404, message: 'user not found', error: true,
  },
  deleted: {
    status: 204, message: null,
  },
  'email in database': {
    status: 409, message: 'Email already registered', error: true,
  },
  'email not registered': {
    status: 401, message: 'Incorrect username or password', error: true,
  },
  'missing auth token': {
    status: 401, message: 'missing auth token', error: true,
  },
  'missing fields in recipe insertion': {
    status: 400, message: 'Invalid entries. Try again.', error: true,
  },
  'missing token': {
    status: 401, message: 'jwt malformed', error: true,
  },
  OK: {
    status: 200, message: false,
  },
  'permition denied': {
    status: 401, message: 'missing auth token', error: true,
  },
  'wrong input': {
    status: 400,
message: 'Invalid entries. Try again.',
    error: true,
  },
  'wrong password': {
    status: 401, message: 'Incorrect username or password', error: true,
  },
};

module.exports = statusMsgMap;
