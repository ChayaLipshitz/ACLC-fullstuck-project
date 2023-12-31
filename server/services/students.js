const db = require('./db')

async function getAll() {
    let result = await db.query('select id, firstName, lastName, className from students s join classes c on s.studentClass = c.classId');
    console.log("get all", result);
    return result;
}

function getSingle(studentId) {
    let result = db.query(`select * from students where id = ${studentId}`);
    console.log(studentId)
    console.log(result);
    return result;
}



function getClass(classId) {
    let result = db.query(`select * from students where classId = ${classId}`);
    return result;
}

async function postSingle(stu) {
    console.log(stu);
    const result = await db.query(
        `INSERT INTO students VALUES (${JSON.stringify(stu.id)}, ${JSON.stringify(stu.first_name)}, ${JSON.stringify(stu.last_name)}, ${JSON.stringify(stu.class)}, ${JSON.stringify(stu.password)})`
    );

    let message = 'Error in creating student';

    if (result.affectedRows) {
        message = 'student created successfully';
    }

    return { message };

}


async function deleteSingle(studentId) {
    console.log(studentId);
    const result1 = await db.query(
        `delete from grades where studentId =${JSON.stringify(studentId)};`
        )
    const result2 = await db.query(
        `delete from students where id = ${studentId}`
    )
    const result3 = await db.query(
        `delete from schedule where studentId = ${studentId}`
    )
    let message = 'Error in deleting student';

    if (result1.affectedRows && result2.affectedRows&&result3.affectedRows ) {
        message = 'student deleted successfully';
    }

    return { message };

}


module.exports = {
    getClass, getAll, getSingle, postSingle, deleteSingle
}