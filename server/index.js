const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();
const studentsRouter = require("./routes/students");
const assignmentsRouter = require("./routes/assignmentsRouter");
const classesRouter = require("./routes/classesRouter");
const coursesRouter = require("./routes/coursesRouter");
const teachersRouter = require("./routes/teachersRouter");
const gradesRouter = require("./routes/gradesRouter");
const secretaryRouter = require("./routes/secretaryRouter");
const scheduleRouter = require("./routes/scheduleRouter");


const port = 8080;

const corsOptions = {
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200

}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}));

app.use("/api/students", studentsRouter);
app.use("/api/classes", classesRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/teachers", teachersRouter);
app.use("/api/grades", gradesRouter);
app.use("/api/secretarys", secretaryRouter);
app.use("/api/assignments", assignmentsRouter);
app.use("/api/schedule", scheduleRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`); console.log("process.env.DB_HOST", process.env.DB_HOST);
});