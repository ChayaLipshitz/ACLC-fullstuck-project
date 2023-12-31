const db = require('./db')

async function postFile(file){
    console.log("query");
    let result = db.query(`insert into assignments values(default,${file.studentId},${file.courseId},${file.taskNumber},'${file.submission}', 'files/${file.url}')`);
    console.log(result);
    return result;
}

let getStudentCourseFile = async (studentID, courseID)=>{
    a = `select url from assignments where studentId = ${studentID} AND courseId = ${courseID};`
    console.log(a);
    let result = db.query(a)
    // console.log("result url:", result);
    return result;
}


let getStudentCourseDetails = async (params)=>{
    let result = db.query(`select id,studentId,courseId,taskNumber, date from assignments where studentId = ${params.id} and courseId=${params.course};`)
    console.log(result);
    return result;
}

postFile

module.exports = {
    postFile, getStudentCourseDetails, getStudentCourseFile
}