const express = require('express');
const router = express.Router();
const teachersService = require('../services/teachersService');


router.get('/:id', async function (req, res, next) {
    console.log("get!!!!!!!!!!!!!", req.params.id);
    try {
        let data = res.json(await teachersService.getSingle(req.params.id));
        console.log("data" , data);
        //res.send(data)
        return data;
    } catch (err) {
        console.error(`Error while getting teacher `, err.message);
        next(err);
    }
});


router.get('/courses/:id', async function (req, res, next) {
    console.log("====================================getcourses=========================================");
    console.log("req.params",req.params);
    try {
        let data = await students.getcourses(req.params.id);
        res.send(data);
    } catch (err) {
        console.error(`Error while getting students `, err.message);
        next(err);
    }
});


router.get('/', async function (req, res, next) {
    try {
        console.log("==========================getAll=======================================");
        let data = await teachersService.getAll();
        res.send(data);
        console.log("data" , data);
        //return data;
    } catch (err) {
        console.error(`Error while getting teachers `, err.message);
        next(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        console.log("==========================delete=======================================");
        console.log("req.params.id",req.params.id);
        res.json(await teachersService.deleteSingle(req.params.id))
    }
    catch (err) {
        console.error(`Error while deleting teacher`, err.message);
    }
})

router.post('/', async (req, res) => {

    try {
        console.log("==========================req.body=======================================");
        console.log(req.body);
        res.json(await teachersService.postSingle(req.body));
    } catch (err) {
        console.error(`Error while creating teacher`, err.message);
    }
});

router.put('/studentList/grades', async (req, res) => {
    try {
        console.log("==========================req.body=======================================");
        console.log("req.body",req.body);
        res.json(await teachersService.putGrade(req.body));
    } catch (err) {
        console.error(`Error while updating grade`, err.message);
    }
});

module.exports = router;