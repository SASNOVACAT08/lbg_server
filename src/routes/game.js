const express = require("express");
const router = express.Router();

const { Game } = require("../db");

router.get("/", async ({}, res) => {
  let games = await Game.findAll();
  return res.send({ type: "success", data: games });
});

router.get("/:id", async ({ params: { id } }, res) => {
  let game = await Game.findOne({ where: { id } });
  if (!game) {
    return res.send({ type: "error", msg: "Doesn't exist" });
  }
  return res.send({ type: "success", data: game });
});

router.post("/", async ({ body: { name, isVisible } }, res) => {
  if (!name || !isVisible) {
    return res.send({ type: "error", msg: "Field uncompleted" });
  }
  if (typeof name !== "string" || typeof isVisible !== "boolean") {
    return res.send({ type: "error", msg: "Wrong format" });
  }
  try {
    let game = await Game.create({ name, isVisible });
    return res.send({ type: "success", data: game });
  } catch {
    return res.send({ type: "error", msg: "Error" });
  }
});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
