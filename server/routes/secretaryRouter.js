const express = require('express');
const router = express.Router();
const secretary = require('../services/secretaryController');

router.get('/:id', async function (req, res, next) {
  console.log(req.params.id);
  try {
    let data = res.json(await secretary.getSingle(req.params.id));
    console.log("data" + data);
    return data;
  } catch (err) {
    console.error(`Error while getting secretary `, err.message);
    next(err);
  }
});


module.exports = router;