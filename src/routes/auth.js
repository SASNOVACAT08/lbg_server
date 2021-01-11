const express = require("express");
const router = express.Router();

const { User } = require("../db");

const {
  isValidEmail,
  hashPassword,
  checkUserEmail,
  comparePassword,
  generateToken,
} = require("../services/auth");

router.post("/login", async ({ body: { email, password } }, res) => {
  if (!email || !password) {
    return res.send({ type: "error", msg: "Field uncompleted" });
  }
  if (!isValidEmail(email) || typeof password !== "string") {
    return res.send({ type: "error", msg: "Wrong format" });
  }
  let client = await checkUserEmail(email);
  if (!client) {
    return res.send({ type: "error", msg: "Email doesn't exist" });
  }
  if (!comparePassword(password, client.password)) {
    return res.send({ type: "error", msg: "Wrong password !" });
  }
  let token = generateToken({ id: client.id, email: client.email });
  return res.send({ type: "success", token });
});

router.post("/register", async ({ body: { email, password } }, res) => {
  if (!email || !password) {
    return res.send({ type: "error", msg: "Field uncompleted" });
  }
  if (!isValidEmail(email) || typeof password !== "string") {
    return res.send({ type: "error", msg: "Wrong format" });
  }
  try {
    let passHash = hashPassword(password);
    await User.create({ email, password: passHash });
    return res.send({ type: "success", msg: "User has been added !" });
  } catch {
    return res.status(500).send({ type: "error", msg: "Email already exist" });
  }
});

module.exports = router;
