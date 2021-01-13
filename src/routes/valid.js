const express = require("express");
const router = express.Router();

router.get("/", ({}, res) => {
  return res.send({ type: "success", msg: "Valid Token" });
});

module.exports = router;
