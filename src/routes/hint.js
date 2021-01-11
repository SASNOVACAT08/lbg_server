const express = require("express");
const router = express.Router();

const { Hint } = require("../db");

router.get("/", async ({}, res) => {
  let hints = await Hint.findAll();
  return res.send({ type: "success", data: hints });
});

router.get("/:id", async ({ params: { id } }, res) => {
  let hint = await Hint.findOne({ where: { id } });
  if (!hint) {
    return res.send({ type: "error", msg: "Doesn't exist" });
  }
  return res.send({ type: "success", data: hint });
});

router.post("/", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
