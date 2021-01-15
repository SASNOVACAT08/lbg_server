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
  if (!name) {
    return res.send({ type: "error", msg: "Field uncompleted" });
  }
  if (typeof name !== "string" || typeof isVisible !== "boolean") {
    console.log(typeof isVisible);
    return res.send({ type: "error", msg: "Wrong format" });
  }
  try {
    let game = await Game.create({ name, isVisible });
    return res.send({ type: "success", data: game });
  } catch {
    return res.send({ type: "error", msg: "Error" });
  }
});

router.put(
  "/:id",
  async ({ params: { id }, body: { name, isVisible } }, res) => {
    if (!name) {
      return res.send({ type: "error", msg: "Empty Field" });
    }
    if (typeof name !== "string") {
      return res.send({ type: "error", msg: "Not a string" });
    }
    if (typeof isVisible !== "boolean") {
      return res.send({ type: "error", msg: "Not a boolean" });
    }
    let game = await Game.update({ name, isVisible }, { where: { id } });
    if (!game[0]) {
      return res.send({
        type: "error",
        msg: "Game cannot be updated, not available yet",
      });
    }
    return res.send({ type: "success", msg: "Game updated" });
  }
);

router.delete("/:id", async ({ params: { id } }, res) => {
  let game = await Game.destroy({ where: { id } });
  if (!game) {
    return res.send({ type: "error", msg: "Game does not exist yet" });
  }
  return res.send({ type: "success", msg: "Game deleted" });
});

module.exports = router;
