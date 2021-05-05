require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const statusMsgMap = require('./dictionaries/statusMsgMap');

const registerServ = async (body) => {
  const { name, email, password, isSeller } = body;

  // if ()
};

module.exports = registerServ;