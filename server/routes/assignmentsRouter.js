const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const router = express.Router();
const assignmentsService = require('../services/assignmentsService');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');


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


router.get('/pdffiles/:courseID/:studentID', async function (req, res) {
    try {
        const fileUrl = await assignmentsService.getStudentCourseFile(req.params.studentID, req.params.courseID);
        if (fileUrl.length) {  
            console.log("url is: ", fileUrl[0].url);
            var file = fs.readFileSync(fileUrl[0].url);
            res.contentType("application/pdf");
            res.send(file);
        }
        else{
            console.log("no URL");
        }
    } catch (error) {
        console.error(error)
    }
  });


module.exports = router;