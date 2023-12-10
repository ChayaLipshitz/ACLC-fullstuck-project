const express = require('express');
const router = express.Router();
const students = require('../services/students');

router.get('/:id', async function (req, res, next) {
  console.log(req.params.id);
  try {
    let data = res.json(await students.getSingle(req.params.id));
    // console.log("data" + data);
    return data;
  } catch (err) {
    console.error(`Error while getting students `, err.message);
    next(err);
  }
});

router.get('/', async function (req, res, next) {
  try {
    console.log("==========================getAll=======================================");

    let data = (await students.getAll());
    res.send(data)
    // console.log("data" , data);
    return data;
  } catch (err) {
    console.error(`Error while getting students `, err.message);
    next(err);
  }
});


router.post('/', async (req, res) => {
  try {
    console.log("==========================req.body=======================================");
    console.log(req.body);
    res.json(await students.postSingle(req.body));
  } catch (err) {
    console.error(`Error while creating student`, err.message);
  }
});


router.delete('/:id',async(req, res)=>{
  try{
    console.log("==========================delete=======================================");
    console.log(req.params.id);
    res.json(await students.deleteSingle(req.params.id))
  }
  catch(err){
    console.error(`Error while deleting student`, err.message);
  }
})

module.exports = router;