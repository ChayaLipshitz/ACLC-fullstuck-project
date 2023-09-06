const express = require('express');
const router = express.Router();
const coursesService = require('../services/coursesService');

router.get('/students/:id', async function (req, res, next) {
  console.log("====================================getcourses=========================================");
  console.log(req.params);
  try {
    let data = await coursesService.getStudentsCourses(req.params.id);
    res.send(data);
  } catch (err) {
    console.error(`Error while getting students `, err.message);
    next(err);
  }
});

router.get('/teachers/:id',async function(req,res,next) {
  console.log("====================================get Courses to teachers=========================================");
  console.log(req.params);
  try {
    let data = await coursesService.getTeachersCourses(req.params.id);
    res.send(data);
  } catch (err) {
    console.error(`Error while getting students `, err.message);
    next(err);
  }
})

router.get('/teachers/studentList/:id', async function (req, res, next) {
  console.log(req.params.id);
  try {
    let data = res.json(await coursesService.getGroup(req.params.id));
    console.log("data" , data);
    return data;
  } catch (err) {
    console.error(`Error while getting students `, err.message);
    next(err);
  }
});

router.get('/', async function (req, res, next) {
  try {
    let data = res.json(await coursesService.getAllCourses());
    console.log("data" , data);
    return data;
  } catch (err) {
    console.error(`Error while getting students `, err.message);
    next(err);
  }
});


module.exports = router;


