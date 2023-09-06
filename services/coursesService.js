const db = require('./db')

async function getStudentsCourses(userId) {
    console.log(userId);
    let a=`select cc.courseId, courseName, passingGrade, t.firstName as teacherFirstName, t.lastName as teacherLastName
    from students s join courseClassContact cc on s.studentClass=cc.classId 
    join courses cr on cr.courseId = cc.courseId
    join teachers t on t.id = cr.teacherId
    where s.id = ${userId}`;
    console.log("request: " , a);
    let result = db.query(a);
    console.log("00000000000 " , result);
    return result;
}

function getGroup(studentId) {
    let result = db.query(`select s.id , s.firstName as studentFirstName , s.lastName as studentLastName , g.grade as grade
    from courses cr
    join courseClassContact cc on cr.courseId = cc.courseId
    join students s on cc.classId = s.studentClass
    left join grades g on s.id = g.studentId and cr.courseId = g.courseId
     where cr.courseId = ${studentId}`);
    console.log(studentId)
    console.log(result);
    return result;
}

async function getTeachersCourses(userId) {
    console.log(userId);
    let a=`select courseName, courseId from courses where teacherId = ${userId}`;
    console.log("request: " , a);
    let result = db.query(a);
    console.log("11111111111 " , result);
    return result;
}


async function  getAllCourses(){

}

module.exports = {
    getStudentsCourses,  getTeachersCourses, getGroup, getAllCourses
}