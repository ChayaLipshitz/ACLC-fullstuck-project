const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const router = express.Router();
const assignmentsService = require('../services/assignmentsService');
const cors = require('cors');
const multer = require('multer');

const corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200

}
router.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});
const upload = multer({ storage: storage });

router.post('/file', upload.single('file'), function (req, res) {
    console.log("=========================================================in file==========================================================");
    //const start = Date.now();
    // console.log(req.body);
    res.json({})
});




router.post('/details', upload.single('file'), async function (req, res, next) {

    // console.log(req);
    console.log("=========================================================in file details==========================================================");
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    req.body.submission = dt.format('Y-m-d H:M:S');
    console.log("req.body.submission", req.body.submission);
    try {
        let data = await assignmentsService.postFile(req.body);
        res.send(data);
    } catch (err) {
        console.error(`Error while getting students `, err.message);
        next(err);
    }
    //res.json({})
});



router.get('/details/:id/:course', async function (req, res, next) {
    console.log("====================================get assignments=========================================");
    console.log(req.params);
    try {
        let data = await assignmentsService.getStudentCourseDetails(req.params);
        res.send(data);
    } catch (err) {
        console.error(`Error while getting details `, err.message);
        next(err);
    }
});

router.get('/file/:id', async function (req, res, next) {
    console.log("====================================get file url=========================================");
    // console.log(req.params);
    try {
        let data = await assignmentsRouter.getStudentCourseFile(req.params.id);
        res.send(data);
    } catch (err) {
        console.error(`Error while getting file `, err.message);
        next(err);
    }
})


router.get('/teachers/studentList/:id', async function (req, res, next) {
    console.log(req.params.id);
    try {
        let data = res.json(await assignmentsRouter.getGroup(req.params.id));
        console.log("data", data);
        return data;
    } catch (err) {
        console.error(`Error while getting students `, err.message);
        next(err);
    }
});

router.get('/', async function (req, res, next) {
    try {
        let data = res.json(await assignmentsRouter.getAllCourses());
        console.log("data", data);
        return data;
    } catch (err) {
        console.error(`Error while getting students `, err.message);
        next(err);
    }
});


module.exports = router;


