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


router.post("/", async ({ body: { name, timestamp, isValid, isVisible, gameId }, user:{ id } }, res) => {
  
  if (!name || !timestamp || !isValid || !isVisible || !gameId  ) {
    return res.send({ type: "error", msg: "Field uncompleted" });
  }
  if (typeof name !== "string") {
    return res.send({ type: "error", msg: "Name is in the Wrong format" });
  }
  if (typeof timestamp !== "string" ){
    return res.send({ type:"error", msg: "Date isn't in string format"});
  }
  if(typeof isValid !== "boolean"){
    return res.send({ type: "error", msg: "Not boolean" });
  }
  if(typeof isVisible !== "boolean"){
    return res.send({ type: "error", msg: "Not boolean" });
  }
  if(typeof gameId !== "number"){
    return res.send({ type: "error", msg: "NaN" });
  }
  try {
    let event = await Event.create({ name, timestamp, isValid, isVisible, game_id: gameId, user_id: id });

    return res.send({ type: "success", data: event });
  } catch  {
    return res.send({ type: "error", msg: "Error" });
  }
});


router.put("/:id", async ({ params: { id }, body:{ name, timestamp, isValid, isVisible } }, res) => {
  if (!name || !timestamp || !isValid || !isVisible){
    return res.send({ type: "error", msg: "Empty Field" });
  } 
  if(typeof name !== "string" ){
    return res.send({type:"error", msg: "Not a string"});
  }
  if(typeof isVisible !== "boolean" ){
    return res.send({type:"error", msg: "isVisible is not a boolean"});
  }
  if(typeof timestamp !== "string"){
    return res.send({type:"error", msg: "This date is not in a string format"});
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
  let event = await event.destroy({where: { id }})
if (!event){
  return res.send ({type:"error", msg:"Event does not exist yet"});
}
  return res.send({type:"success", msg: "Event deleted"});
});

module.exports = router;
