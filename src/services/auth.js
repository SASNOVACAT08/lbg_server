const bcrypt = require("bcrypt");
const { User } = require("../db");
const jwt = require("jsonwebtoken");

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

const hashPassword = (password) => bcrypt.hashSync(password, 10);

const checkUserEmail = async (email) => {
  try {
    return await User.findOne({ where: { email } });
  } catch {
    return false;
  }
};

const comparePassword = (password, hashedPass) =>
  bcrypt.compareSync(password, hashedPass);

const generateToken = (data) => jwt.sign(data, process.env.SECRET);

module.exports = {
  isValidEmail,
  hashPassword,
  checkUserEmail,
  comparePassword,
  generateToken,
};
