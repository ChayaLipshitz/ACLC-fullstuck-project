const express = require('express');
const router = express.Router();
const scheduleService = require('../services/scheduleService');

router.get('/:id', async function (req, res, next) {
    console.log("====================================get get schedule schedule schedule schedule schedule schedule=========================================");
    console.log("req.params.id", req.params.id);
    console.log("req.body", req.body);
    try {
        let data = await scheduleService.getData(req.params.id);
        res.send(data);
    } catch (err) {
        console.error(`Error while post schedule `, err.message);
        next(err);
    }
});

router.post('/:id', async function (req, res, next) {
    console.log("====================================post post schedule schedule schedule schedule schedule schedule=========================================");
    console.log("req.params.id", req.params.id);
    console.log("req.body", req.body);
    try {
        let data = await scheduleService.postData(req.params.id, req.body);
        res.send(data);
    } catch (err) {
        console.error(`Error while post schedule `, err.message);
        next(err);
    }
});

router.put('/:id', async function (req, res, next) {
    console.log("====================================put put schedule schedule schedule schedule schedule schedule=========================================");
    console.log("req.params.id", req.params.id);
    console.log("req.body", req.body);
    try {
        let data = await scheduleService.putData(req.params.id, req.body);
        res.send(data);
    } catch (err) {
        console.error(`Error while updateing schedule `, err.message);
        next(err);
    }
});

router.delete('/:id', async function (req, res, next) {
    console.log("====================================delete delete schedule schedule schedule schedule schedule schedule=========================================");
    console.log("req.params.id", req.params.id);
    console.log("req.body", req.body);
    try {
        let data = await scheduleService.deleteData(req.params.id, req.body);
        res.send(data);
    } catch (err) {
        console.error(`Error while deleting schedule `, err.message);
        next(err);
    }
});

router.put('')

module.exports = router;