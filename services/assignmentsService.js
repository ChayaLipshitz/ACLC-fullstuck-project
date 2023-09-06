const db = require('./db')

async function postFile(file){
    console.log("query");
    let result = db.query(`insert into assignments values(default,${file.studentId},${file.courseId},'${file.submission}', 'files/${file.url}')`);
    console.log(result);
    return result;
}

let getStudentCourseFile = async (params)=>{
    let result = db.query(`select url from assignments where id = ${params.id};`)
    console.log(result);
    return result;

}


let getStudentCourseDetails = async (params)=>{
    let result = db.query(`select id,studentId,courseId,submissionDate from assignments where studentId = ${params.id} and courseId=${params.course};`)
    console.log(result);
    return result;
}

postFile

module.exports = {
    postFile, getStudentCourseDetails, getStudentCourseFile
}