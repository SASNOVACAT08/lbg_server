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


router.post("/", async ({ body: { name, content, isVisible, gameId }, user:{ id } }, res) => {
  if (!name || !content || !isVisible || !gameId ) {
    return res.send({ type: "error", msg: "Field uncompleted" });
  }
  if (typeof name !== "string") {
    return res.send({ type: "error", msg: "Wrong format" });
  }
  if(typeof isVisible !== "boolean") {
    return res.send({ type: "error", msg: "isVisible is not in boolean format" })
  }
  if( typeof content == "undefined"){
    return res.send({ type: "error", msg: "[content] problem" })
  }
  if(typeof gameId !== "number"){
    return res.send({ type: "error", msg: "NaN" });
  }
  try {
    console.log(gameId);
    let hint = await Hint.create({ name, content, isVisible, game_id: gameId, user_id: id });
    return res.send({ type: "success", data: hint });
  } catch(e) {
    console.log(e);
    return res.send({ type: "error", msg: "Error" });
  }
});


router.put("/:id", async ({ params: { id }, body:{ name, content, isVisible } }, res) => {
  if (!name || !content || !isVisible ){
    return res.send({ type: "error", msg: "Empty Field" });
  } 
  if(typeof name !== "string" ){
    return res.send({type:"error", msg: "Not a string"});
  }
  if(typeof content !== "string" ) {
    return res.send({type:"error", msg: "Not a string"});
  }
  if(typeof isVisible !== "boolean" ){
    return res.send({type:"error", msg: "Not a boolean"});
  }
    let hint = await Hint.update({ name, content, isVisible}, { where:{ id } } );
    if(!hint[0]){
      return res.send ({type:"error", msg:"Hint cannot be updated, not available yet"});
    }
      return res.send({type: "success",  msg:"Hint updated" })
  

});

router.delete("/:id", async ({ params: { id } }, res) => {
  let hint = await Hint.destroy({where: { id}})
if (!hint){
  return res.send ({type:"error", msg:"Hint does not exist yet"});
}
  return res.send({type:"success", msg: "Hint deleted"});
});


module.exports = router;
