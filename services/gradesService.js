const db = require('./db')


async function getStudentsGrades(userId){
    let result = db.query(`select grade, courseName, passingGrade from students s
    join grades g on s.id = g.studentId
    join courses c on g.courseId = c.courseId
    where s.id =${userId}`)
    console.log(result);
    return result;
}


module.exports = {
     getStudentsGrades
}