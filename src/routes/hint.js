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


router.post("/", async ({ body: { name,content, isVisible } }, res) => {
  if (!name || !content || !isVisible) {
    return res.send({ type: "error", msg: "Field uncompleted" });
  }
  if (typeof name !== "string" || typeof content !== NULL || typeof isVisible !== "boolean") {
    return res.send({ type: "error", msg: "Wrong format" });
  }
  try {
    let hint = await Hint.create({ name, content, isVisible });
    return res.send({ type: "success", data: hint });
  } catch {
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
    let hint = await Hint.update({ name, isVisible}, { where:{ id } } );
    if(!hint[0]){
      return res.send ({type:"error", msg:"Hint cannot be updated, not available yet"});
    }
      return res.send({type: "success",  msg:"Hint updated" })
  

});

router.delete("/:id", async ({ params: { id } }, res) => {
  let hint = await hint.destroy({where: { id}})
if (!hint){
  return res.send ({type:"error", msg:"Hint does not exist yet"});
}
  return res.send({type:"success", msg: "Hint deleted"});
});

module.exports = router;
