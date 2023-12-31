const db = require('./db')

async function getAll(){
    console.log("query");
    let result = await db.query('select courseName, courseId from courses;');
    console.log(result);
    return result;
}

async function getStudentsCourses(userId) {
    console.log(userId);
    let a=`select cc.courseId, courseName, passingGrade, t.firstName as teacherFirstName, t.lastName as teacherLastName
    from students s join courseclasscontact cc on s.studentClass=cc.classId 
    join courses cr on cr.courseId = cc.courseId
    join teachers t on t.id = cr.teacherId
    where s.id = ${userId}`;
    // console.log("request: " , a);
    let result = await db.query(a);
    console.log("00000000000 " , result);
    return result;
}

function getGroup(courseID) {
    let result = db.query(`select s.id , s.firstName as studentFirstName , s.lastName as studentLastName , g.grade as grade
    from courseclasscontact cc
    join students s on cc.classId = s.studentClass
    left join grades g on s.id = g.studentId and cc.courseId = g.courseId
    where cc.courseId = ${courseID}`);
    // console.log(studentId)
    console.log(result);
    return result;
}

async function getTeachersCourses(userId) {
    console.log(userId);
    let a=`select courseName, courseId from courses where teacherId = ${userId}`;
    // console.log("request: " , a);
    let result = db.query(a);
    // console.log("11111111111 " , result);
    return result;
}


async function  getAllCourses(){

}

module.exports = {
    getAll, getStudentsCourses,  getTeachersCourses, getGroup, getAllCourses
}