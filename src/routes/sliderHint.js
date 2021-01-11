const express = require("express");
const router = express.Router();

const { SliderHint } = require("../db");

router.get("/", async ({}, res) => {
  let sliderHints = await SliderHint.findAll();
  return res.send({ type: "success", data: sliderHints });
});

router.get("/:id", async ({ params: { id } }, res) => {
  let sliderHint = await SliderHint.findOne({ where: { id } });
  if (!sliderHint) {
    return res.send({ type: "error", msg: "Doesn't exist" });
  }
  return res.send({ type: "success", data: sliderHint });
});

router.post("/", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
