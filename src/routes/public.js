const express = require("express");
const router = express.Router();

const { Hint, SliderHint, Game, Event } = require("../db");

router.get("/hint", async ({}, res) => {
  let hints = await Hint.findAll({
    where: { isVisible: true },
    include: [Game, Event],
  });
  let newHints = hints.filter((hint) => {
    if (hint.Game.isVisible) {
      if (hint.Event) {
        if (hint.Event.isVisible && hint.Event.isValid) {
          return true;
        }
      } else {
        return true;
      }
    }
    return false;
  });
  return res.send({ type: "success", data: newHints });
});

router.get("/sliderhint", async ({}, res) => {
  let sliderHints = await SliderHint.findAll({
    where: { isVisible: true },
    include: [Game, Event],
  });
  let newSliderHints = sliderHints.filter((sliderHint) => {
    if (sliderHint.Game.isVisible) {
      if (sliderHint.Event) {
        if (sliderHint.Event.isVisible && sliderHint.Event.isValid) {
          return true;
        }
      } else {
        return true;
      }
    }
    return false;
  });
  return res.send({ type: "success", data: newSliderHints });
});

module.exports = router;
