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



router.post("/", async ({ body: { name, link, isVisible, gameId }, user:{ id } }, res) => {
  if (!name || !link || !isVisible || !gameId ) {
    return res.send({ type: "error", msg: "Field uncompleted" });
  }
  if (typeof name !== "string") {
    return res.send({ type: "error", msg: "Wrong format" });
  }
  if( typeof link !== "string"){
    return res.send({ type: "error", msg: "[content] problem" })
  }
  if(typeof isVisible !== "boolean") {
    return res.send({ type: "error", msg: "isVisible is not in boolean format" })
  }
  if(typeof gameId !== "number"){
    return res.send({ type: "error", msg: "NaN" });
  }
  try {
   // console.log(userId);
    let sliderHint = await SliderHint.create({ name, link, isVisible,  game_id: gameId, user_id: id });
    return res.send({ type: "success", data: sliderHint });
  } catch(e) {
    console.log(e);
    return res.send({ type: "error", msg: "Error" });
  }
});




router.put("/:id", async ({ params: { id }, body:{ name, link, isVisible } }, res) => {
  if (!name || !link || !isVisible ){
    return res.send({ type: "error", msg: "Empty Field" });
  } 
  if(typeof name !== "string" ){
    return res.send({type:"error", msg: "The name is not a string"});
  }
  if(typeof link !== string ) {
    return res.send({type:"error", msg: "The link is not a string"});
  }
  if(typeof isVisible !== "boolean" ){
    return res.send({type:"error", msg: "Not a boolean"});
  }
    let hint = await Hint.update({ name, link, isVisible}, { where:{ id } } );
    if(!hint[0]){
      return res.send ({type:"error", msg:"Hint cannot be updated, not available yet"});
    }
      return res.send({type: "success",  msg:"Hint updated" })
  

});

router.delete("/:id", async ({ params: { id } }, res) => {
  let sliderHint = await SliderHint.destroy({where: { id}})
if (!sliderHint){
  return res.send ({type:"error", msg:"SliderHint does not exist yet"});
}
  return res.send({type:"success", msg: "SliderHint deleted"});
});

module.exports = router;
