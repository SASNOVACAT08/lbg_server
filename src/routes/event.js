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


router.post("/", async ({ body: { name,timestamp, isVisible, isValid } }, res) => {
  if (!name || !isVisible || !isValid) {
    return res.send({ type: "error", msg: "Field uncompleted" });
  }
  if (typeof name !== "string" || typeof timestamp !=="Date" || typeof isVisible !== "boolean" || typeof isValid !=="boolean") {
    return res.send({ type: "error", msg: "Wrong format" });
  }
  try {
    let event = await Event.create({ timestamp:Date.now, name, isVisible });
    return res.send({ type: "success", data: event });
  } catch {
    return res.send({ type: "error", msg: "Error" });
  }
});


router.put("/:id", async ({ params: { id }, body:{ name, timestamp, isValid, isVisible } }, res) => {
  if (!name || !timestamp || !isValid || !isVisible  ){
    return res.send({ type: "error", msg: "Empty Field" });
  } 
  if(typeof name !== "string" ){
    return res.send({type:"error", msg: "Not a string"});
  }
  if(typeof isVisible !== "boolean" ){
    return res.send({type:"error", msg: "isVisible is not a boolean"});
  }
  if(typeof isValid !== "boolean" ){
    return res.send({type:"error", msg: " isValid is not a boolean"});
  }
    let event = await Event.update({ name, isVisible}, { where:{ id } } );
    if(!event[0]){
      return res.send ({type:"error", msg:"Event cannot be updated, not available yet"});
    }
      return res.send({type: "success",  msg:"Event updated" })
  

});

router.delete("/:id", async ({ params: { id } }, res) => {
  let event = await event.destroy({where: { id}})
if (!event){
  return res.send ({type:"error", msg:"Event does not exist yet"});
}
  return res.send({type:"success", msg: "Event deleted"});
});

module.exports = router;
