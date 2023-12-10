const express = require('express');
const router = express.Router();
const gradesService = require('../services/gradesService');

router.get('/students/:id', async function (req, res, next) {
    console.log("====================================get grades to student=========================================");
    try {
        let data = await gradesService.getStudentsGrades(req.params.id);
        res.send(data);
    } catch (err) {
        console.error(`Error while getting grades `, err.message);
        next(err);
    }
});

router.put('')

module.exports = router;