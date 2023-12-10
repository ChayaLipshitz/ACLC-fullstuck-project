const db = require('./db')

function getSingle(teacherId) {
    let a = `select * from teachers where id = ${JSON.stringify(teacherId)}`
    // console.log("a",a);
    let result = db.query(a);
    console.log("teacherId",teacherId)
    console.log("result",result);
    return result;
}


async function getAll() {
    let course1 = await db.query('select teacherId, courseName, courseId from courses');
    let teacher1 =  await db.query('select id, firstName, lastName, password from teachers ');
    let obj = {
       courses: course1,
        teachers: teacher1
    }    
    return obj;
}


async function postSingle(tea) {
    // console.log("tea",tea);
    const result = await db.query(
        `INSERT INTO teachers VALUES (${JSON.stringify(tea.id)}, ${JSON.stringify(tea.first_name)}, ${JSON.stringify(tea.last_name)}, ${JSON.stringify(tea.password)})`
    );
    let res;
    tea.course.map(async item=>{
        res = await db.query(
            `update courses set teacherId = ${JSON.stringify(tea.id)} where courseId = ${JSON.parse(item)}`
    )})

    let message = 'Error in creating teacher';
    if (result.affectedRows) {
        message = 'teacher created successfully';
    }
    return { message };

}

async function deleteSingle(teacherId) {
    console.log("teacherId",teacherId);
    const result1 = await db.query(
        `delete from courses where teacherId =${JSON.stringify(teacherId)};`
    )
    const result2 = await db.query(
        `delete from teachers where id = ${teacherId}`
    )
    let message = 'Error in deleting teacher';

    if (result1.affectedRows && result2.affectedRows) {
        message = 'teacher deleted successfully';
    }
    return { message };
}

async function getCourses(id) {
    console.log("id",id);
    const result = await db.query(
        `select courseName, passingGrade from teachers t join courses c on t.id = c.teacherId
        where t.id =${id})`
    );
    console.log("result",result);
    return result;
}


async function putGrade(body) {
    let result = null;
    // console.log("body",body);
    const try1 = await db.query(
        `select * from grades where courseId = ${body.course} and studentId = ${body.id};`
    );
    console.log("try1: \n", try1);
    if (try1[0] == undefined) {
        result = await db.query(
            `insert into grades values(${body.course} ,${body.id},${body.grade})`);
    } else {
        myQuery = `update grades set grade =${body.grade} where courseId = ${body.course} and studentId = ${body.id};`
        result = await db.query(
            myQuery
        );
    }

    console.log("result",result);
    let message = 'Error in update grade';
    if (result.affectedRows) {
        message = 'grade updated successfully';
        code = 200
    }
    else{
        message = "oops... something went wrong!!"
        code = 400
    }
    return { message, code };
}

module.exports = {
    postSingle, getSingle, getCourses, putGrade, getAll, deleteSingle
}