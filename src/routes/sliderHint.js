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


router.post("/", async ({ body: { name, link, isVisible } }, res) => {
  if (!name || !link || !isVisible) {
    return res.send({ type: "error", msg: "Field uncompleted" });
  }
  if (typeof name !== "string" || typeof link !== "string"|| typeof isVisible !== "boolean") {
    return res.send({ type: "error", msg: "Wrong format" });
  }
  try {
    let hint = await Hint.create({ name, link, isVisible });
    return res.send({ type: "success", data: hint });
  } catch {
    return res.send({ type: "error", msg: "Error" });
  }
});



router.put("/:id", async ({ params: { id }, body:{ name, link, isVisible } }, res) => {
  if (!name || !link || !isVisible ){
    return res.send({ type: "error", msg: "Empty Field" });
  } 
  if(typeof name !== "string" ){
    return res.send({type:"error", msg: "Not a string"});
  }
  if(typeof link !== string ) {
    return res.send({type:"error", msg: "Not a string"});
  }
  if(typeof isVisible !== "boolean" ){
    return res.send({type:"error", msg: "Not a boolean"});
  }
    let hint = await Hint.update({ name, isVisible}, { where:{ id } } );
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
