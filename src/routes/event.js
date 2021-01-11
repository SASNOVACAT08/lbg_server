const express = require("express");
const router = express.Router();

const { Event } = require("../db");

router.get("/", async ({}, res) => {
  let events = await Event.findAll();
  return res.send({ type: "success", data: events });
});

router.get("/:id", async ({ params: { id } }, res) => {
  let event = await Event.findOne({ where: { id } });
  if (!event) {
    return res.send({ type: "error", msg: "Doesn't exist" });
  }
  return res.send({ type: "success", data: event });
});

router.post("/", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
