const express = require('express');
const router = express.Router();
const classesService = require('../services/classesService');

router.get('/', async function(req, res, next) {
  console.log("hello");
  try {
    let data = res.json(await classesService.getAll());
    console.log("data" +data);
    res.send(data)
  } catch (err) {
    console.error(`Error while getting classes `, err.message);
    next(err);
  }
});




module.exports = router;